import React from "react"
import ContentLoader from "react-content-loader"

const PostsLoader = (props) => (
	<ContentLoader
		speed={2}
		width={100 + '%'}
		height={100 + '%'}
		{...props}
	>
		<rect x="0" y="0" rx="0" ry="0" width="100%" height="350" />
		<rect x="5%" y="383" rx="10" ry="10" width="90%" height="20" />
		<rect x="5%" y="423" rx="10" ry="10" width="90%" height="15" />
		<rect x="0" y="465" rx="0" ry="0" width="100%" height="72" />
	</ContentLoader>
)

export default PostsLoader
