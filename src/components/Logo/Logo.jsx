import React from 'react'
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/quantum-logo-white.png'

const Logo = () => {
	return <>
		<Link to="/">
			<img src={logoImg} alt="React Quantum" />
		</Link>
	</>
}

export default Logo