import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './../../hooks/useAuth';
import { authMe, setTokens } from './../../helpers/helpers';
import { useTranslation } from 'react-i18next';
import { authRequests } from '../../api/api';

const Verify = () => {
	const { t } = useTranslation()
	const { auth, setAuth } = useAuth();
	const [otp, setOtp] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		const verifyData = { otp, code: auth.code }
		authRequests.verify(verifyData)
			.then(res => {
				if (res.data.status === "success") {
					const returnLocation = location.state?.from?.pathname ? location.state.from?.pathname : '/'
					setTokens(res.data.tokens)
					authMe(setAuth, navigate, returnLocation)
				} else if (res.data.status === "error") {
					console.error('Error message', res.data.message);
				}
			})
	}
	const reSendOtp = () => {
		authRequests.resend(auth.code)
			.then(res => {
				if (res.data.status === "success") {
					setAuth({ code: res.data.code })
				}
			})
	}
	if (!auth.code) {
		return <Navigate to='/signin' />
	}
	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container">
				<div className="row">
					<div className=" col s12 l8 offset-l2 center-align white-text">
						<h1>{t('2fa')}</h1>
						<div className="card teal accent-4">
							<div className="card-content">
								<form onSubmit={onSubmitHandler}>
									<div className="form-container">
										<div className="input-field">
											<label htmlFor="otp" className="auth-form-label">{t('otp')}</label>
											<input
												name="otp"
												type="text"
												value={otp}
												onChange={(e) => setOtp(e.target.value)}
											/>
											<span onClick={reSendOtp} style={{ color: 'white', fontSize: '14px', cursor: 'pointer' }}
												to='/'>
												{t('resend_otp')}
											</span>
										</div>
										<div>
											<button className="btn btn-large waves-effect waves-light" type="submit">
												{t('send')}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Verify