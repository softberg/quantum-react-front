import React, { useEffect, useState } from 'react'
import PostItem from './PostItem/PostItem';
import { axiosRequest } from '../../api/api';
import PostsLoader from '../../myLoader/PostsLoader';

const Posts = () => {
	const url = process.env.REACT_APP_API_URL
	const [allPosts, setallPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axiosRequest('GET', '/api-posts').then(res => {
			if (res.status === 200) {
				setallPosts(res.data.data)
				setLoading(false)
			}
		})
	}, []);

	const loader = []
	for (let i = 0; i < 8; i++) {
		loader.push(<div key={i} className="col s12 m3 post-item">
			<div className="card post-card hoverable">
				<PostsLoader />
			</div>
		</div>);
	}

	return <>
		<div className="main-wrapper">
			<h1 className="center-align teal-text">Posts</h1>
			<div className="row post_container">
				{loading ? loader : allPosts.length > 0
					? allPosts.map(post => <PostItem post={post} url={url} key={post.id} />)
					: <h4 className="center-align">No posts found... Try creating new one</h4>}
			</div>
		</div>
	</>
}

export default Posts