import React, { useEffect, useState } from 'react'
import BackButton from '../../../partials/BackButton';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SinglePostLoader from './../../../myLoader/SinglePostLoader';
import { getPosts } from '../../../api/api';

const SinglePost = () => {
	const [post, setPost] = useState({});
	const [loading, setloading] = useState(true);
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		getPosts.getPostById(params.postId)
			.then(res => {
				if (res.status === 200) {
					setPost(res.data.data)
					setloading(false)
				} else if (res.response.status === 404) {
					navigate('/404')
				}
			})

	}, [navigate, params.postId]);
	document.title = post.title ? post.title + " | " + process.env.REACT_APP_APP_NAME : process.env.REACT_APP_APP_NAME

	return <>
		<div className="center-align posts-container">
			<div className="polaroid">
				{loading
					? <SinglePostLoader />
					: <>
						<BackButton />
						<h1 className="single-blog-title">{post.title}</h1>
						<div className="row">
							<div className="col s12 center-align post-date teal-text text-accent-4">{post.date}</div>
							<div className="col s12 center-align post-author teal-text text-accent-4">{post.author}</div>
						</div>
						{post.image && <img src={post.image} className="single_page_img" alt='' />}
						<p className="left-align single-blog-txt">{post.content}</p>
					</>
				}
			</div>
		</div>
	</>
}

export default SinglePost