import { apiConfig, headers } from "./api"

export const postApi = {
    getAllPosts() {
        return apiConfig.get('/api/posts')
    },

    getPostById(id) {
        return apiConfig.get(`/api/post/${id}`)
    },

    getMyPosts(tokens) {
        return apiConfig.get('/api/my-posts', { headers: headers(tokens) })
    },

    createPost(postData, tokens) {
        return apiConfig.post(`/api/my-posts/create`, postData, { headers: headers(tokens) })
    },

    updatePost(postId, postData, tokens) {
        return apiConfig.put(`/api/my-posts/amend/${postId}`, postData, { headers: headers(tokens) })
    },

    deletePostOrImage(url, id, tokens) {
        return apiConfig.delete(`/api/my-posts/${url}/${id}`, { headers: headers(tokens) })
    }
}