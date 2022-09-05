import { axiosRequest } from './../api/api';
export const authMe = (setAuth, navigate = null, returnLocation) => {
	axiosRequest('GET', '/api-me').then(res => {
		if (res.status === 200) {
			if (res.data.tokens) {
				setTokens(res.data.tokens)
			}
			setAuth(state => {
				return {
					...state,
					firstname: res.data.data.firstname,
					lastname: res.data.data.lastname,
				}
			});
			if (navigate) {
				navigate(returnLocation, { replace: true, state: '' });
			}
		} else if (res.response.status === 401) {
			localStorage.clear()
			setAuth({})
		}
		setAuth(state => {
			return {
				...state,
				loading: false
			}
		})
	})
}


export const setTokens = (tokens) => {
	localStorage.setItem("access_token", tokens.access_token);
	localStorage.setItem("refresh_token", tokens.refresh_token);
}