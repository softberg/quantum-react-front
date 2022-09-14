import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';

const RequireAuth = () => {
	const location = useLocation()
	const { auth } = useAuth()

	return (
		auth.firstname
			? <Outlet />
			: <Navigate to='/signin' state={{ from: location }} replace />
	)
}

export default RequireAuth