import React, { useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { authMe, setTokens } from './../../helpers/helpers';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';
import { useTranslation } from 'react-i18next';
import { authApi } from '../../api/authApi';


const SignIn = () => {
    const { t } = useTranslation()
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [visibilityToggle, setVisibilityToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    document.title = t('signin') + " | " + process.env.REACT_APP_APP_NAME

    const onSubmitHandler = async ({ email, password, remember }) => {
        const loginData = { email, password, remember }
        authApi.signIn(loginData)
            .then(res => {
                if (res.data?.status === "success") {
                    if (res.data.tokens) {
                        const returnLocation = location.state?.from?.pathname ? location.state.from?.pathname : '/'
                        setTokens(res.data.tokens)
                        authMe(setAuth, navigate, returnLocation)
                    }
                    if (res.data.code) {
                        setAuth({ code: res.data.code })
                        navigate('/verify', { replace: true, state: { from: { pathname: location.state?.from?.pathname } } });
                    }
                } else if (res.data.status === 'error') {
                    setErrorMessage(res.data.message)
                }
            })
    }

    if (localStorage.getItem('access_token')) {
        authMe(setAuth)
        if (auth.firstname) {
            return <Navigate to='/' />
        }
    }
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Required'),
    });

    return <>
        <div className="main-wrapper teal accent-4">
            <div className='container'>
                <div className="row">
                    <div className="col s12 l8 offset-l2 center-align white-text">
                        <h1>{t('signin')}</h1>
                        {errorMessage && <div className="material-alert error">
                            {errorMessage}
                        </div>}
                        <div className="card teal accent-4">
                            <div className="card-content">
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                        rememberMe: false
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={values => {
                                        onSubmitHandler({
                                            email: values.email,
                                            password: values.password,
                                            remember: values.rememberMe
                                        })
                                        setErrorMessage(null)
                                    }}
                                >
                                    {({ errors, touched, handleSubmit }) => (
                                        <Form onSubmit={e => handleSubmit(e)} className="signup-form" onChange={() => setErrorMessage(null)}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <Field
                                                        name="email"
                                                        type="text"
                                                    />
                                                    {errors.email && touched.email ? (
                                                        <div>{errors.email}</div>
                                                    ) : null}
                                                    <label htmlFor="email">{t('email')}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <label
                                                        className="auth-form-label"
                                                        htmlFor="password"
                                                    >
                                                        {t('password')}
                                                    </label>
                                                    <Field
                                                        name="password"
                                                        type={visibilityToggle ? 'text' : 'password'}
                                                    />
                                                    {errors.password && touched.password ? (
                                                        <div>{errors.password}</div>
                                                    ) : null}
                                                    <Icon
                                                        className="visibility-icon"
                                                        onClick={() => setVisibilityToggle(!visibilityToggle)}
                                                        >
                                                        {visibilityToggle ? 'visibility' : 'visibility_off'}
                                                    </Icon>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col s12 l6">
                                                    <div className="row">
                                                        <div className="col s12 left-align">
                                                            <Link
                                                                to="/signup"
                                                                className="white-text"
                                                            >
                                                                {t('signup')}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col s12 left-align">
                                                            <Link
                                                                to="/forget"
                                                                className="white-text"
                                                            >
                                                                {t('forget_password')}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col s12 l6 remember-box">
														<label>
															<Field
																type="checkbox"
																name="rememberMe"
																className="checkbox-white"
															/>
															<span className="white-text">{t('remember_me')}</span>
														</label>
													</div> */}
                                            </div>
                                            <div className="row">
                                                <button className="btn btn-large waves-effect waves-light"
                                                        type="submit"
                                                >
                                                    {t('signin')}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SignIn