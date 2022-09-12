import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';
import { useTranslation } from 'react-i18next';
import { authRequests } from '../../api/api';

const SignUp = () => {
	const { t } = useTranslation()
	const { auth } = useAuth()
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(null);
	const [visibilityToggle, setvisibilityToggle] = useState(false);

	const onSubmitHandler = async (loginData) => {
		authRequests.signUp(loginData)
			.then(res => {
				if (res.data.status === "success") {
					navigate('/signin')
				} else if (res.data.status === 'error') {
					setErrorMessage(res.data.message.email)
				}
			})
	}

	if (auth.firstname) {
		return <Navigate to='/' />
	}

	const SignupSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string()
			.min(6, 'Too Short!')
			.max(16, 'Too Long!')
			.required('Required'),
		firstname: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		lastname: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
	});

	return <>
		<div className="main-wrapper teal accent-4">
			<div className='container'>
				<div className="row">
					<div className="col s12 l8 offset-l2 center-align white-text">
						<h1>{t('signup')}</h1>
						{errorMessage && errorMessage.map((message, i) => <div key={i} className="material-alert error">
							{message}
						</div>)}
						<div className="card accent-4 teal">
							<div className="card-content">
								<Formik
									initialValues={{
										email: '',
										password: '',
										firstname: '',
										lastname: '',
									}}
									validationSchema={SignupSchema}
									onSubmit={values => {
										onSubmitHandler({
											email: values.email,
											password: values.password,
											firstname: values.firstname,
											lastname: values.lastname,
										})
										setErrorMessage(null)
									}}
								>
									{({ errors, touched, handleSubmit, handleBlur }) => (
										<Form onSubmit={e => handleSubmit(e)} onChange={() => setErrorMessage(null)}>
											<div className="row">
												<div className="input-field col s12">
													<Field
														onBlur={handleBlur}
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
													<label className="auth-form-label" htmlFor="password">{t('password')}</label>
													<Field
														onBlur={handleBlur}
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
												<div className="input-field col s12">
													<Field
														onBlur={handleBlur}
														name="firstname"
														type="text"
													/>
													{errors.firstname && touched.firstname ? (
														<div>{errors.firstname}</div>
													) : null}
													<label className="auth-form-label" htmlFor="firstname">{t('first_name')}</label>
												</div>
											</div>
											<div className="row">
												<div className="input-field col s12">
													<Field
														onBlur={handleBlur}
														name="lastname"
														type="text"
													/>
													{errors.lastname && touched.lastname ? (
														<div>{errors.lastname}</div>
													) : null}
													<label className="auth-form-label" htmlFor="firstname">{t('last_name')}</label>
												</div>
											</div>
											<div className="row">
												<div className="col s12 right-align">
													<Link to="/signin"
														className="white-text">{t('signin')}</Link>
												</div>
											</div>
											<div>
												<button className="btn btn-large waves-effect waves-light" type="submit">
													{t('send')}
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

export default SignUp