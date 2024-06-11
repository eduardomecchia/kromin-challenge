import axios from 'axios'
import LocalStorageManager from '../utilities/local-storage-manager'
import config from '../config'
import {LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN} from "../utilities/constants";

const axiosConfig = {
    baseURL: config.apiEndpoint,
    headers: {
        common: {
            Authorization: LocalStorageManager.accessToken.get()
                ? `Bearer ${LocalStorageManager.accessToken.get()}`
                : false,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        post: {
            'Access-Control-Allow-Origin': '*',
        },
    },
}

// create axios custom instance with custom config
const axiosInstance = axios.create(axiosConfig)


const attemptRefresh = async refreshToken => {
    const url = '/auth/refresh-token'

    const {
        data: { tokens },
    } = await axiosInstance.post(url, {
        refresh_token: refreshToken,
    })

    // update local storage
    LocalStorageManager.accessToken.set(tokens[LOCAL_STORAGE_ACCESS_TOKEN])
    LocalStorageManager.refreshToken.set(tokens[LOCAL_STORAGE_REFRESH_TOKEN])

    // update UserContext
    window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_ACCESS_TOKEN,
        newValue: tokens[LOCAL_STORAGE_ACCESS_TOKEN]
    }))
    window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_REFRESH_TOKEN,
        newValue: tokens[LOCAL_STORAGE_REFRESH_TOKEN]
    }))
    return tokens
}

axiosInstance.interceptors.request.use(request => {
    const token = LocalStorageManager.accessToken.get()
    if (token) request.headers['Authorization'] = `Bearer ${token}`
    return request
})

let pendingRefresh = false // prevent multiple refresh


axiosInstance.interceptors.response.use(
    response => {
        // pass response without change
        return response
    },
    async error => {
        // get error info
        let statusCode = error?.response?.status
        let originalRequest = error.config
        switch (statusCode) {
            case 401:
                const refreshToken = LocalStorageManager.refreshToken.get()
                LocalStorageManager.accessToken.remove()
                try {
                    if (
                        refreshToken &&
                        !originalRequest._retry &&
                        !pendingRefresh
                    ) {
                        originalRequest._retry = true // prevent infinite retry loop
                        pendingRefresh = true
                        await attemptRefresh(refreshToken)
                        pendingRefresh = false
                        return axiosInstance.request(originalRequest)
                    }
                }catch (err){
                    console.log('cannot refresh token', err)
                }
                // if not returning a new access token, clear local storage
                LocalStorageManager.removeAuthData()
                // alert the UserContext that the storage is now clear
                window.dispatchEvent(new StorageEvent('storage', {
                    key: LOCAL_STORAGE_ACCESS_TOKEN,
                    newValue: null
                }))
                // reject original request
                return Promise.reject(error)
            default:
                return Promise.reject(error)
        }
    }
)

export default axiosInstance
