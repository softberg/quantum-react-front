import React from "react"
import ContentLoader from "react-content-loader"

const MyPostsLoader = (props) => (
	<li className="collection-item avatar" style={{paddingLeft: '5px'}}>
		<ContentLoader
			speed={2}
			width={100 + '%'}
			height={64}
			{...props}
		>
			<rect x="68" y="3" rx="3" ry="3" width="250" height="18" />
			<rect x="68" y="27" rx="3" ry="3" width="350" height="15" />
			<circle cx="30" cy="30" r="30" />
		</ContentLoader>
	</li>
)

export default MyPostsLoader
