import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
	const navigate = useNavigate()

	return <>
		<span className="pointer back-btn" title="Back" onClick={() => navigate(-1)}>
			<i className="material-icons">arrow_back</i>
		</span>
	</>
}

export default BackButton