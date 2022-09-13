import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './../Logo/Logo';
import useAuth from './../../hooks/useAuth';
import { Dropdown, Icon, Navbar, NavItem } from 'react-materialize';
import { useTranslation } from "react-i18next";
import { authApi } from "../../api/authApi";

const NavBarMenu = () => {
    const { t, i18n } = useTranslation()
    const { auth, setAuth } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const onLanguageChange = (lang) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
    }
    const signoutHandler = () => {
        const tokens = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token'),
        };
        authApi.signOut(tokens)
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
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
            <Link to='/' className="mobileShow"><Icon left >home</Icon>{t('home')}</Link>
            <Link to='posts'><Icon left className="mobileShow" >assignment</Icon>{t('posts')}</Link>
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
                    <Link to='/my-posts'>{t('my_posts')}</Link>
                    <NavItem href='#' onClick={signoutHandler}>{t('signout')}</NavItem>
                </Dropdown>}

            {(location.pathname !== '/signup' && !auth.firstname) && <Link to='/signup' ><Icon left className="mobileShow">person_add</Icon>{t('signup')}</Link>}
            {(location.pathname !== '/signin' && !auth.firstname) && <Link to='/signin' ><Icon left className="mobileShow">exit_to_app</Icon>{t('signin')}</Link>}

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
                trigger={<NavItem href="#!"><Icon left>language</Icon>{t('lang')}</NavItem>}
            >
                <Link to='#' onClick={() => onLanguageChange('en')}>{t('en')}</Link>
                <Link to='#' onClick={() => onLanguageChange('ru')}>{t('ru')}</Link>
                <Link to='#' onClick={() => onLanguageChange('am')}>{t('am')}</Link>
            </Dropdown>
        </Navbar>
    </>
}

export default NavBarMenu