import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MyPostItem from './MyPostItem/MyPostItem';
import DeleteModal from './DeleteModal';
import { setTokens } from '../../helpers/helpers';
import MyPostsLoader from '../../myLoader/MyPostsLoader';
import { useTranslation } from 'react-i18next';
import useAuth from './../../hooks/useAuth';
import { getPosts } from '../../api/api';

const MyPosts = () => {
	const { setAuth } = useAuth()
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [loading, setloading] = useState(true);
	// const [errorMessage, seterrorMessage] = useState(null);
	const [id, setId] = useState('')
	useEffect(() => {
		const tokens = {
			access_token: localStorage.getItem('access_token'),
			refresh_token: localStorage.getItem('refresh_token'),
		};
		getPosts.getMyPosts(tokens)
			.then(res => {
				if (res.status === 200) {
					if (res.data.tokens) {
						setTokens(res.data.tokens)
					}
					setPosts(res.data.data)
				} else if (res.status === 401) {
					setAuth({})
				}
				setloading(false)
			})
	}, [setAuth]);

	const loader = []
	for (let i = 0; i < 8; i++) {
		loader.push(<MyPostsLoader key={i} />);
	}


	const deletePost = (postId) => {
		setPosts(state => state.filter(post => post.uuid !== postId))
	}

	return <>
		<div className="main-wrapper posts-container">
			<h1 className="center-align teal-text">{t('my_posts')}</h1>
			{!loading
				? posts.length
					? <div className="row container">
						<ul className="collection">
							{posts.map(post => <MyPostItem key={post.uuid} post={post} setId={setId} />)}
						</ul>
					</div>
					: <h4 className="center-align">{t('no_posts')}... {t('try_creating')}</h4>
				: <div className="row container">
					<ul className="collection">
						{loader}
					</ul>
				</div>}
			<div className="fixed-action-btn">
				<Link className="btn-floating btn-large waves-effect waves-light blue-grey darken-1 hoverable"
					to="/create-post"><i className="material-icons">add</i></Link>
			</div>
			<DeleteModal url='delete' id={id} setState={deletePost} item={t('the_post')} />
		</div>
	</>
}

export default MyPosts