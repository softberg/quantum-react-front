import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
	const location = useLocation()

	return (
		localStorage.getItem("isAuth")
			? <Outlet />
			: <Navigate to='/signin' state={{ from: location }} replace />
	)
}

export default RequireAuth