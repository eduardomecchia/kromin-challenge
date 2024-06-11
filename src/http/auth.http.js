import axios from "./";


const AuthAPI = {
    loginUser: data => {
        const url = '/auth/login'
        return axios.post(url, data)
    },
    logoutUser: () => {
        const url = '/auth/logout'
        return axios.get(url)
    },
    signupUser: data => {
        const url = '/auth/signup'
        return axios.post(url, data)
    }
}

export default AuthAPI