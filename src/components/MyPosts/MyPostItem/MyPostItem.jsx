import React from 'react'
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const MyPostItem = ({ post,setId }) => {
	return <>
		<li className="collection-item avatar">
			<img src={post.image ? post.image : process.env.REACT_APP_API_URL + '/assets/images/no-image.png'} className="circle img-my-post" alt='' />
			<span className="title post-title" title="<?php echo $post['title'] ?>">
				<Link className="teal-text post-title" to={'/posts/' + post.uuid}>
					{post.title}
				</Link>
			</span>
			<p>
				{post.updated_at} <br />
				{post.author ? post.author : ''}
			</p>
			<Link to={'/update-post/' + post.uuid} className="secondary-content edit-my-post" title="Edit" style={{ right: '50px' }}>
				<Icon>edit</Icon>
			</Link>
			<span
				className="pointer secondary-content modal-trigger"
				href="#modal1"
				node="button"
				onClick={()=>setId(post.uuid)}
			>
				<Icon>delete</Icon>
			</span>
		</li>
	</>
}

export default MyPostItem