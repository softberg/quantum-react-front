import axios from 'axios'


const headers = (tokens) => {
	return {
		Authorization: 'Bearer ' + tokens.access_token,
		refresh_token: tokens.refresh_token
	}
}

const apiConfig = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

const routesWithoutToken = ['/api-posts', '/api-post/', '/api-signin', '/api-signup', '/api-verify', '/api-forget', '/api-reset/', '/api-resend/']

apiConfig.interceptors.response.use(
	response => response,
	error => {
		if (!error.response) {
			console.log('?', error);
		}
		if (error.response.status === 401) {
			localStorage.clear()
		}
		// if (error.response.status === 404) {
		// 	return
		// }
		console.log(error);
		return error;
	});

export const axiosRequest = async (method, url, postDataOrGetParam = '', token = '') => {
	const tokens = {
		access_token: localStorage.getItem('access_token'),
		refresh_token: localStorage.getItem('refresh_token'),
	};
	switch (method) {
		case 'GET':
			try {
				if (tokens.access_token !== null && !routesWithoutToken.includes(url)) {
					return await apiConfig.get(url + postDataOrGetParam, { headers: headers(tokens) });
				} else if (routesWithoutToken.includes(url)) {
					return await apiConfig.get(url + postDataOrGetParam)
				} else {
					return { response: { status: 401 } }
				}
			} catch (err) {
				console.log(err);
			}
			break;

		case 'POST':
			try {
				if (tokens.access_token !== null) {
					return await apiConfig.post(url, postDataOrGetParam, { headers: headers(tokens) })
				} else if (routesWithoutToken.includes(url)) {
					return await apiConfig.post(url + token, postDataOrGetParam)
				} else {
					return { status: 401 }
				}
			} catch (err) {
				console.log(err);
			}
			break;
		case 'PUT':

			try {
				if (tokens.access_token !== null) {
					return await apiConfig.put(url, postDataOrGetParam, { headers: headers(tokens) })
				} else if (routesWithoutToken.includes(url)) {
					return await apiConfig.post(url, postDataOrGetParam)
				} else {
					return { status: 401 }
				}
			} catch (err) {
				console.log(err);
			}
			break;
		case 'DELETE':

			try {
				if (tokens.access_token !== null) {
					return await apiConfig.delete(url + postDataOrGetParam, { headers: headers(tokens) })
				} else {
					return { status: 401 }
				}
			} catch (err) {
				console.log(err);
			}
			break;

		default:
			break;
	}

}