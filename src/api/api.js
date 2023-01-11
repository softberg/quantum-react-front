import axios from "axios"

export const apiConfig = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

apiConfig.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    config.headers.refresh_token = localStorage.getItem('refresh_token')
    return config
})





















export const headers = (tokens) => {
    return {
        Authorization: 'Bearer ' + tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

