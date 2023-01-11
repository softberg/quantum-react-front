import { apiConfig, headers } from "./api"

export const postApi = {
    getAllPosts() {
        return apiConfig.get('/api/posts')
    },
    getPostById(id) {
        return apiConfig.get(`/api/post/${id}`)
    },
    getMyPosts() {
        return apiConfig.get('/api/my-posts',)
    },
    createPost(postData) {
        return apiConfig.post(`/api/my-posts/create`, postData)
    },
    updatePost(postId, postData) {
        return apiConfig.put(`/api/my-posts/amend/${postId}`, postData)
    },
    deletePostOrImage(url, id) {
        return apiConfig.delete(`/api/my-posts/${url}/${id}`)
    }
}