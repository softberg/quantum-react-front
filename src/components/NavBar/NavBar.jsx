import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './../Logo/Logo';
import useAuth from './../../hooks/useAuth';
import { axiosRequest } from './../../api/api';
import { Dropdown, Icon, Navbar, NavItem } from 'react-materialize';

const NavBarMenu = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation()
	const navigate = useNavigate()

	const signoutHandler = () => {
		axiosRequest('GET', '/api-signout').then(res => {
			if (res.status === 200) {
				localStorage.clear()
				navigate('/signin')
				setAuth({ firstname: '', lastname: '', access_token: '' })
			}
		})
	}

	return <>
		<Navbar
			alignLinks="right"
			brand={<span className="navbar-logo">
				{location.pathname !== '/' && <Logo />}
			</span>}
			id="mobile-nav"
			menuIcon={<Icon>menu</Icon>}
			options={{
				draggable: true,
				edge: 'left',
				inDuration: 250,
				onCloseEnd: null,
				onCloseStart: null,
				onOpenEnd: null,
				onOpenStart: null,
				outDuration: 200,
				preventScrolling: true
			}}
			className="teal accent-4"
		>
			<Link to='/' className="mobileShow"><Icon left >home</Icon>Home</Link>
			<Link to='posts'><Icon left className="mobileShow" >assignment</Icon>Posts</Link>
			{auth.firstname
				&& <Dropdown
					id="dropdown1"
					options={{
						alignment: 'right',
						autoTrigger: true,
						closeOnClick: true,
						constrainWidth: true,
						container: null,
						coverTrigger: true,
						hover: false,
						inDuration: 150,
						onCloseEnd: null,
						onCloseStart: null,
						onOpenEnd: null,
						onOpenStart: null,
						outDuration: 250
					}}
					trigger={<NavItem href='#'><Icon left >person</Icon>{auth.firstname} {auth.lastname}<Icon right>arrow_drop_down</Icon></NavItem>}
				>
					<Link to='/my-posts'>My Posts</Link>
					<NavItem href='#' onClick={signoutHandler}>Sign Out</NavItem>
				</Dropdown>}

			{(location.pathname !== '/signup' && !auth.firstname) && <Link to='/signup' ><Icon left className="mobileShow">person_add</Icon>Sign Up</Link>}
			{(location.pathname !== '/signin' && !auth.firstname) && <Link to='/signin' ><Icon left className="mobileShow">exit_to_app</Icon>Sign In</Link>}

			<Dropdown
				id="dropdown2"
				options={{
					alignment: 'right',
					autoTrigger: true,
					closeOnClick: true,
					constrainWidth: true,
					container: null,
					coverTrigger: true,
					hover: false,
					inDuration: 150,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					outDuration: 250
				}}
				trigger={<NavItem href="#!"><Icon left>language</Icon>Eng</NavItem>}
			>
				<Link to='#'>English</Link>
				<Link to='#'>Russian</Link>
				<Link to='#'>Armenian</Link>
			</Dropdown>
		</Navbar>
	</>
}

export default NavBarMenu