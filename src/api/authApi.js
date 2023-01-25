import { apiConfig } from './api';

export const authApi = {
    authMe() {
        return apiConfig.get('/api/me')
    },

    signOut() {
        return apiConfig.get(`/api/signout`)
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