import React from 'react'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';

const Home = () => {
	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container wrapper">
				<div className="center-align white-text">
					<div className="logo-block">
						<Logo />
					</div>
					<h1>{process.env.REACT_APP_APP_NAME}</h1>
					<div className="card teal accent-4">
						<div className="card-content">
							<h5>Very fast and extremely simple, next generation PHP MVC framework with modular structure, which makes it possible to create projects of any complexity.</h5>
						</div>
					</div>
					<div className="index-links">
						<Link to="/about" className="white-text">About</Link>
						<a href={process.env.REACT_APP_LEARN_MORE} target="_blank" rel="noreferrer" className="white-text">Learn More</a>
					</div>
				</div>
			</div>
		</div>
		<ul className="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</>
}

export default Home