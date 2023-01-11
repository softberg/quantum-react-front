import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authApi } from '../../api/authApi';

const Reset = () => {
	const { t } = useTranslation()
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [visibilityToggle, setVisibilityToggle] = useState(false);
	const [visibilityToggleRepeat, setVisibilityToggleRepeat] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	document.title = t('reset_password') + " | " + process.env.REACT_APP_APP_NAME
	const onSubmitHandler = (passwords) => {
		authApi.reset(params.reset_token, passwords)
			.then(res => {
				if (res.data.status === "success") {
					navigate('/signin')
				} else if (res.data.status === 'error') {
					setErrorMessage(res.data.message[0])
				}
			})
	}
	const signupSchema = Yup.object().shape({
		new_password: Yup.string()
			.min(6, 'Too Short!')
			.max(16, 'Too Long!')
			.required('Required'),
		repeat_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
	});
	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container">
				<div className="row">
					<div className=" col s12 l8 offset-l2 center-align white-text">
						<h1>{t('reset_password')}</h1>
						{successMessage && <div className="material-alert success left-align" role="alert">
							{successMessage}
						</div>}
						{errorMessage && <div className="material-alert error">
							{errorMessage}
						</div>}
						<div className="card teal accent-4">
							<div className="card-content">
								<Formik
									initialValues={{
										new_password: '',
										repeat_password: '',
									}}
									validationSchema={signupSchema}
									onSubmit={values => {
										onSubmitHandler({ password: values.new_password, repeat_password: values.repeat_password })
										setErrorMessage(null)
										setSuccessMessage(null)
									}}
								>
									{({ errors, touched, handleSubmit }) => (<>
										<Form onSubmit={e => handleSubmit(e)}
											  onChange={(
												      () => setSuccessMessage(null),
													  () => setErrorMessage(null)
											  )}
										>
											<div className="input-field">
												<label className="auth-form-label" htmlFor="new_password">{t('new_password')}</label>
												<Field
													name="new_password"
													type={visibilityToggle ? 'text' : 'password'}
												/>
												{errors.new_password && touched.new_password ? (
													<div>{errors.new_password}</div>
												) : null}
												<Icon
													className="visibility-icon"
													onClick={() => setVisibilityToggle(!visibilityToggle)}
												>
													{visibilityToggle ? 'visibility' : 'visibility_off'}
												</Icon>
											</div>
											<div className="input-field">
												<label className="auth-form-label" htmlFor="repeat_password">{t('repeat_password')}</label>
												<Field
													name="repeat_password"
													type={visibilityToggleRepeat ? 'text' : 'password'}
												/>
												{errors.repeat_password && touched.repeat_password ? (
													<div>{errors.repeat_password}</div>
												) : null}
												<Icon
													className="visibility-icon"
													onClick={() => setVisibilityToggleRepeat(!visibilityToggleRepeat)}
												>
													{visibilityToggleRepeat ? 'visibility' : 'visibility_off'}
												</Icon>
											</div>
											<div>
												<button
													className="btn btn-large waves-effect waves-light"
													type="submit"
												>
													{t('send')}
												</button>
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

export default Reset