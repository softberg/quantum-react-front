import React from 'react'
import Bubbles from './../Bubbles/Bubbles';
import { useTranslation } from 'react-i18next';

const About = () => {
	const { t } = useTranslation()

	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container wrapper center-align white-text">
				<h1>{t('about')}</h1>
				<div className="card teal accent-4">
					<div className="card-content">
						<h6>{t('about_framework')}</h6>
						<h4>{t('version')}</h4>
						<h6>{t('current_version', { version: 2.7 })}</h6>
						<h4>{t('installation')}</h4>
						<ul className="step-list">
							<li>
								<h6>{t('create_project')}</h6>
								<code>&gt; composer create-project quantum/project [project name]</code>
							</li>
							<li>
								<h6>{t('run_server')}</h6>
								<code>&gt; php qt serve</code>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<Bubbles />
	</>
}

export default About