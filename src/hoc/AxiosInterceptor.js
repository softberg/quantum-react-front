import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './../hooks/useAuth';

const apiConfig = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();
	const { setAuth } = useAuth()

    useEffect(() => {
        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = error => {
            if (!error.response) {
                console.log('?', error);
            }
            if (error.response.status === 401) {
                setAuth({})
                localStorage.clear()
            }
            if (error.code === "ERR_NETWORK") {
                setAuth({})
                localStorage.clear()

                return {
                    status: 500,
                    message: "An unexpected error"
                }
            }
            return error;
        }


        const interceptor = apiConfig.interceptors.response.use(resInterceptor, errInterceptor);

        return () => apiConfig.interceptors.response.eject(interceptor);

    }, [navigate, setAuth])

    return children;
}

export default apiConfig;
export { AxiosInterceptor }