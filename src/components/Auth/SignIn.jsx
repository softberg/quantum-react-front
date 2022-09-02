import React, { useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { axiosRequest } from './../../api/api';
import useAuth from '../../hooks/useAuth';
import { authMe, setTokens } from './../../helpers/helpers';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';


const SignIn = () => {
	const { auth, setAuth } = useAuth()
	const navigate = useNavigate();
	const location = useLocation();
	const [visibilityToggle, setvisibilityToggle] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmitHandler = async ({ username, password, remember }) => {
		const loginData = { username, password, remember }
		axiosRequest('POST', '/api-signin', loginData).then(res => {
			if (res.data.status === "success") {
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
				switch (res.data.message) {
					case "inactive_account":
						setErrorMessage('Inactive account')
						break
					case "incorrect_auth_credentials":
						setErrorMessage('Incorrect auth credentials')
						break
					default:
						break
				}
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
						<h1>Sign In</h1>
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
											username: values.email,
											password: values.password,
											remember: values.rememberMe
										})
									}}
								>
									{({ errors, touched, handleSubmit }) => (
										<Form onSubmit={e => handleSubmit(e)} className="signup-form">
											<div className="row">
												<div className="input-field col s12">
													<Field
														name="email"
														type="text"
													/>
													{errors.email && touched.email ? (
														<div>{errors.email}</div>
													) : null}
													<label htmlFor="email">Email</label>
												</div>
											</div>
											<div className="row">
												<div className="input-field col s12">
													<label className="auth-form-label" htmlFor="password">Password</label>
													<Field
														name="password"
														type={visibilityToggle ? 'text' : 'password'}
													/>
													{errors.password && touched.password ? (
														<div>{errors.password}</div>
													) : null}
													<Icon className="visibility-icon" onClick={() => setvisibilityToggle(!visibilityToggle)}>{visibilityToggle ? 'visibility' : 'visibility_off'}</Icon>
												</div>
											</div>
											<div className="row">
												<div className="col s12 l6">
													<div className="row">
														<div className="col s12 left-align">
															<Link to="/signup" className="white-text">Sign Up</Link>
														</div>
													</div>
													<div className="row">
														<div className="col s12 left-align">
															<Link to="/forget" className="white-text">Forgot password?</Link>
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
															<span className="white-text">Remember Me</span>
														</label>
													</div> */}
											</div>
											<div className="row">
												<button className="btn btn-large waves-effect waves-light" type="submit">
													SIGN IN
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