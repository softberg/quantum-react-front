import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { axiosRequest } from '../../api/api';
import useAuth from './../../hooks/useAuth';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';

const SignUp = () => {
	const { auth } = useAuth()
	const navigate = useNavigate();
	const [visibilityToggle, setvisibilityToggle] = useState(false);

	const onSubmitHandler = async (loginData) => {
		axiosRequest('POST', '/api-signup', loginData).then(res => {
			if (res.status === 200) {
				navigate('/signin');
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
						<h1>Sign Up</h1>
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
									}}
								>
									{({ errors, touched, handleSubmit, handleBlur }) => (
										<>
											<Form onSubmit={e => handleSubmit(e)}>
												<div className="form-container">
													<div className="input-field">
														<Field
															onBlur={handleBlur}
															name="email"
															type="text"
														/>
														{errors.email && touched.email ? (
															<div>{errors.email}</div>
														) : null}
														<label htmlFor="email">Email</label>
													</div>
													<div className="input-field p-rel">
														<label className="auth-form-label" htmlFor="password">Password</label>
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
													<div className="input-field">
														<Field
															onBlur={handleBlur}
															name="firstname"
															type="text"
														/>
														{errors.firstname && touched.firstname ? (
															<div>{errors.firstname}</div>
														) : null}
														<label className="auth-form-label" htmlFor="firstname">First name</label>
													</div>
													<div className="input-field">
														<Field
															onBlur={handleBlur}
															name="lastname"
															type="text"
														/>
														{errors.lastname && touched.lastname ? (
															<div>{errors.lastname}</div>
														) : null}
														<label className="auth-form-label" htmlFor="firstname">Last name</label>
													</div>
													<div className="row">
														<div className="col s12 right-align">
															<Link to="/signin"
																className="white-text">Sign In</Link>
														</div>
													</div>
													<div>
														<button className="btn btn-large waves-effect waves-light" type="submit">
															SEND
														</button>
													</div>
												</div>
											</Form>
										</>
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