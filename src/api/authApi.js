import { apiConfig, headers } from './api';

export const authApi = {
    authMe(tokens) {
        return apiConfig.get('/api/me', { headers: headers(tokens) })
    },

    signOut(tokens) {
        return apiConfig.get(`/api/signout`, { headers: headers(tokens) })
    },

    signIn(loginData) {
        return apiConfig.post(`/api/signin`, loginData)
    },

    signUp(loginData) {
        return apiConfig.post(`/api/signup`, loginData)
    },

    verify(verifyData) {
        return apiConfig.post(`/api/verify`, verifyData)
    },

    resend(code) {
        return apiConfig.get(`/api/resend`, code)
    },

    reset(resetToken, passwords) {
        return apiConfig.post(`/api/reset/${resetToken}`, passwords)
    },

    forget(email) {
        return apiConfig.post(`/api/forget`, email)
    },

    activate(activateToken) {
        return apiConfig.get(`/api/activate/${activateToken}`)
    }
}