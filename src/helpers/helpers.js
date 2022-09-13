import { authApi } from "../api/authApi";

export const authMe = (setAuth, navigate = null, returnLocation) => {
	const tokens = {
		access_token: localStorage.getItem('access_token'),
		refresh_token: localStorage.getItem('refresh_token'),
	};
	authApi.authMe(tokens)
		.then(res => {
			console.log(res);
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
			} else if (res.status === 401) {
				localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
				setAuth({})
			}
			setAuth(state => {
				return {
					...state,
					loading: false,
					error: res.message && res.message
				}
			})
		})
}


export const setTokens = (tokens) => {
	localStorage.setItem("access_token", tokens.access_token);
	localStorage.setItem("refresh_token", tokens.refresh_token);
}

export const currentLang = () => {
    if (!localStorage.getItem('i18nextLng')) return ''
    return localStorage.getItem('i18nextLng')
}