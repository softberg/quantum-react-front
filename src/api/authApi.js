import { currentLang } from '../helpers/helpers';
import { apiConfig, headers } from './api';

export const authApi = {
    authMe(tokens) {
        return apiConfig.get('/api-me', { headers: headers(tokens) })
    },

    signOut(tokens) {
        return apiConfig.get(`${currentLang()}/api-signout`, { headers: headers(tokens) })
    },

    signIn(loginData) {
        return apiConfig.post(`${currentLang()}/api-signin`, loginData)
    },

    signUp(loginData) {
        return apiConfig.post(`${currentLang()}/api-signup`, loginData)
    },

    verify(verifyData) {
        return apiConfig.post(`${currentLang()}/api-verify`, verifyData)
    },

    resend(code) {
        return apiConfig.get(`${currentLang()}/api-resend`, code)
    },

    reset(resetToken, passwords) {
        return apiConfig.post(`${currentLang()}/api-reset/${resetToken}`, passwords)
    },

    forget(email) {
        return apiConfig.post(`${currentLang()}/api-forget`, email)
    },

    activate(activateToken) {
        return apiConfig.get(`${currentLang()}/api-activate/${activateToken}`)
    }
}