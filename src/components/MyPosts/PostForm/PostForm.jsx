import React, { useEffect, useState } from 'react'
import BackButton from '../../../partials/BackButton'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { axiosRequest } from './../../../api/api';
import { Row, Textarea, TextInput, Icon, Button } from 'react-materialize';
import DeleteModal from '../DeleteModal';
import { useTranslation } from 'react-i18next';

const PostForm = ({ pageTitle }) => {
	const { t } = useTranslation()
	const params = useParams()
	const navigate = useNavigate()
	const [postForm, setpostForm] = useState({});
	const [postTitle, setpostTitle] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const [postContent, setpostContent] = useState('');

	useEffect(() => {
		if (params.postId) {
			axiosRequest('GET', '/api-post/', params.postId).then(res => {
				if (res.status === 200) {
					setpostForm(res.data.data)
					setpostTitle(res.data.data.title)
					setpostContent(res.data.data.content)
				} else if (res.response.status === 404) {
					navigate('/404')
				}
			})
		}
	}, [params.postId, navigate]);

	const deleteImage = () => {
		setpostForm(state => {
			return { ...state, image: '' }
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		const postData = new FormData()
		selectedImage && postData.append('image', selectedImage)
		postData.append('title', postTitle)
		postData.append('content', postContent)

		if (!params.postId) {
			axiosRequest('POST', '/api-my-posts/create', postData)
				.then(res => {
					if (res.data.status === 'success') {
						navigate('/my-posts')
					} else if (res.data.status === 'error') {
						console.error('Error message', res.data.message);
					}
				})
		} else {
			axiosRequest('PUT', '/api-my-posts/amend/' + params.postId, postData)
				.then(res => {
					if (res.status === 200) {
						navigate('/my-posts')
					} else if (res.response.status === 404) {
						navigate('/404')
					}
				})
		}
	}

	return <>
		<div className="post-form full-height">
			<div className="polaroid">
				<BackButton />
				<div className="row">
					<div className="col s12">
						<h1 className="center-align teal-text">{pageTitle}</h1>
						<div className="card teal accent-4">
							<div className="card-content">
								<form onSubmit={onSubmitHandler}>
									<Row>
										<TextInput
											label={t('title')}
											id="title"
											value={postTitle}
											onChange={(e) => setpostTitle(e.target.value)}
											name="title"
											s={12}
											className="validate"
										/>
									</Row>
									<Row>
										<Textarea
											label={t('content')}
											className={pageTitle === 'Update Post' ? 'postFotmTextarea' : ''}
											s={12}
											value={postContent}
											onChange={(e) => setpostContent(e.target.value)}
											name="content"
											id="content"
											data-length="1000"
										/>
									</Row>
									<div className="file-field input-field upload-btn">
										<div className="btn">
											<span>Image</span>
											<input
												type="file"
												name="image"
												onChange={(e) => setSelectedImage(e.target.files[0])}
											/>
										</div>
										<div className="file-path-wrapper">
											<input className="file-path validate" type="text" />
										</div>
									</div>
									<div className="post-image">
										{postForm.image &&
											<>
												<Button
													className="waves-effect waves-light btn modal-trigger image_delete"
													href="#modal1"
													node="button"
													title={t('delete')}
												>
													<Icon>close</Icon>
												</Button>
												<DeleteModal url='/api-my-posts/delete-image/' id={postForm.id} setState={deleteImage} item={t('the_image')} />
												<img src={postForm.image} className="update_page_img" alt='' />
											</>
										}
									</div>
									<div className="center-align">
										<button className="btn btn-large waves-effect waves-light submit-btn" type="submit">
											{t('save')}
										</button>
										<Link to="/my-posts"
											className="btn btn-large waves-effect waves-teal btn-flat white-text">
											{t('cancel')}
										</Link>
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

export default PostForm