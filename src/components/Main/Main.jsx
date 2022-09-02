import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBarMenu from '../NavBar/NavBar';
import useAuth from '../../hooks/useAuth';
import { motion } from "framer-motion";

const PageLayout = ({ children }) => children;

const pageVariants = {
	initial: {
		opacity: 0
	},
	in: {
		opacity: 1
	},
	out: {
		opacity: 0
	}
};

const pageTransition = {
	type: "tween",
	ease: "linear",
	duration: .8
};


const Main = () => {
	const { auth } = useAuth()
	const { pathname } = useLocation();
	return <>

		<header>
			<NavBarMenu />
		</header>
		{auth.loading
			? <main></main>
			: <PageLayout>
				<motion.main
					key={pathname}
					initial="initial"
					animate="in"
					variants={pageVariants}
					transition={pageTransition}
				>
					<Outlet />
				</motion.main>
			</PageLayout>
		}
		<footer className='page-footer'>
			<Footer />
		</footer>

	</>
}

export default Main