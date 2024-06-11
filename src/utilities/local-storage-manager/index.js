import {
    LOCAL_STORAGE_ACCESS_TOKEN,
    LOCAL_STORAGE_REFRESH_TOKEN,
    LOCAL_STORAGE_USER,
} from '../constants'

const accessToken = {
    set: value => {
        return localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, value)
    },
    get: () => {
        return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
    },
    remove: () => {
        sessionStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
    },
}

const refreshToken = {
    set: value => {
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, value)
    },
    get: () => {
        return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
    },
    remove: () => {
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN)
    },
}

const user = {
    set: value => {
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(value))
    },
    get: () => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER))
    },
    remove: () => {
        localStorage.removeItem(LOCAL_STORAGE_USER)
    },
}

const removeAuthData = () => {
    accessToken.remove()
    refreshToken.remove()
    user.remove()
}

const LocalStorageManager = {
    accessToken,
    refreshToken,
    user,
    removeAuthData,
}

export default LocalStorageManager
