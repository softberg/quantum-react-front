import React from 'react'
import { NavItem } from 'react-materialize'
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation()
	return <>
		<div className="footer-copyright teal accent-4">
			<div className="container">
				<div className="row">
					<div className="col s12 l10 footer-text">
						© 2018 - {new Date().getFullYear() + ' ' + process.env.REACT_APP_APP_NAME}
					</div>
					<div className="col s12 l2 footer-text">
						<NavItem href={process.env.REACT_APP_LEARN_MORE} target="_blank" className="white-text">{t('learn_more')}</NavItem>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Footer