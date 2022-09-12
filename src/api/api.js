import apiConfig from './../hoc/AxiosInterceptor';

const headers = (tokens) => {
    return {
        Authorization: 'Bearer ' + tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

export const authRequests = {
    authMe(tokens) {
        return apiConfig.get('/api-me', { headers: headers(tokens) })
    },

    signOut(tokens) {
        return apiConfig.get('/api-signout', { headers: headers(tokens) })
    },

    signIn(loginData) {
        return apiConfig.post('/api-signin', loginData)
    },

    signUp(loginData) {
        return apiConfig.post('/api-signup', loginData)
    },

    verify(verifyData) {
        return apiConfig.post('/api-verify', verifyData)
    },

    resend(code) {
        return apiConfig.get('/api-resend', code)
    },

    reset(resetToken, passwords) {
        return apiConfig.post(`/api-reset/${resetToken}`, passwords)
    },

    forget(email) {
        return apiConfig.post('/api-fprget', email)
    },

    activate(activateToken) {
        return apiConfig.get(`/api-activate/${activateToken}`)
    }
}

export const getPosts = {
    getAllPosts() {
        return apiConfig.get('/api-posts')
    },

    getPostById(id) {
        return apiConfig.get(`/api-post/${id}`)
    },

    getMyPosts(tokens) {
        return apiConfig.get('/api-my-posts', { headers: headers(tokens) })
    },

    createPost(postData, tokens) {
        return apiConfig.post('/api-my-posts/create', postData, { headers: headers(tokens) })
    },

    updatePost(postId, postData, tokens) {
        return apiConfig.put(`/api-my-posts/amend/${postId}`, postData, { headers: headers(tokens) })
    },

    deletePostOrImage(url, id, tokens) {
        return apiConfig.delete(`/api-my-posts/${url}/${id}`, { headers: headers(tokens) })
    }
}