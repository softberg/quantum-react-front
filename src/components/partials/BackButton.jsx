import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BackButton = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return <>
		<span className="pointer back-btn" title={t('back')} onClick={() => navigate(-1)}>
			<i className="material-icons">arrow_back</i>
		</span>
	</>
}

export default BackButton