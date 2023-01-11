import React from 'react'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import Bubbles from '../Bubbles/Bubbles';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation()
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
                            <h5>{t('description')}</h5>
                        </div>
                    </div>
                    <div className="index-links">
                        <Link to="/about" className="white-text">{t('about')}</Link>
                        <a href={process.env.REACT_APP_LEARN_MORE} target="_blank" rel="noreferrer" className="white-text">{t('learn_more')}</a>
                    </div>
                </div>
            </div>
        </div>
        <Bubbles />
    </>
}

export default Home