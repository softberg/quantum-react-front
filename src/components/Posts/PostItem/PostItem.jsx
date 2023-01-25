import React from 'react'
import { Link } from 'react-router-dom';

const PostItem = ({ post, url }) => {
	return <>
		<div className="col s12 m3 post-item">
			<div className="card post-card hoverable">
				<Link to={post.id}>
					<div className="card-image card-image-box">
						{post.image
							? <img src={post.image} className="content_img" alt='' />
							: <img src={url + '/assets/images/no-image.png'} className="content_no_img" alt='' />}
					</div>
				</Link>
				<div className="card-content white teal-text text-darken-4">
					<span className="card-title post-title" title={post.title}>
						<Link className="teal-text"
							to={post.id}>
							{post.title}
						</Link>
					</span>
					<p className="truncate">{post.content}</p>
				</div>
				<div className="card-action teal accent-4">
					<div className="row">
						<div className="col s12">
							<div className="post-date">{post.date}</div>
							<div className="post-author">{post.author}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default PostItem