import axios from "axios"

export const apiConfig = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const headers = (tokens) => {
    return {
        Authorization: 'Bearer ' + tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

