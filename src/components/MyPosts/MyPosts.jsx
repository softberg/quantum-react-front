import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosRequest } from '../../api/api';
import MyPostItem from './MyPostItem/MyPostItem';
import DeleteModal from './DeleteModal';
import { setTokens } from '../../helpers/helpers';
import MyPostsLoader from '../../myLoader/MyPostsLoader';

const MyPosts = () => {
	const [posts, setPosts] = useState([])
	const [loading, setloading] = useState(true);
	const [id, setId] = useState('')
	useEffect(() => {
		axiosRequest('GET', '/api-my-posts').then(res => {
			if (res.status === 200) {
				if (res.data.tokens) {
					setTokens(res.data.tokens)
				}
				setPosts(res.data.data)
				setloading(false)
			}
		})
	}, []);

	const loader = []
	for (let i = 0; i < 8; i++) {
		loader.push(<MyPostsLoader key={i} />);
	}


	const deletePost = (postId) => {
		setPosts(state => state.filter(post => post.uuid !== postId))
	}

	return <>
		<>
			<div className="main-wrapper posts-container">
				<h1 className="center-align teal-text">My Posts</h1>
				{!loading ?
					<>
						{posts.length ? <div className="row container">
							<ul className="collection">
								{posts.map(post => <MyPostItem key={post.uuid} post={post} setId={setId} />)}
							</ul>
						</div>
							:
							<h4 className="center-align">No posts found... Try creating new one</h4>}
					</>
					: <div className="row container">
						<ul className="collection">
							{loader}
						</ul>
					</div>}
				<div className="fixed-action-btn">
					<Link className="btn-floating btn-large waves-effect waves-light blue-grey darken-1 hoverable"
						to="/create-post"><i className="material-icons">add</i></Link>
				</div>
				<DeleteModal url='/api-my-posts/delete/' id={id} setState={deletePost} item='post' />
			</div>
		</>
	</>
}

export default MyPosts