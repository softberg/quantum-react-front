import React from "react"
import ContentLoader from "react-content-loader"

const SinglePostLoader = (props) => (
		<ContentLoader
			speed={2}
			width={100 + '%'}
			height={75 + 'vh'}
			{...props}
		>
			<rect x="17.5%" y="0" rx="20" ry="20" width="65%" height="40" />
			<rect x="32.5%" y="70" rx="10" ry="10" width="35%" height="20" />
			<rect x="32.5%" y="100" rx="10" ry="10" width="35%" height="15" />
			<rect x="0" y="135" rx="5" ry="5" width="100%" height="400" />
			<rect x="0" y="565" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="585" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="605" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="625" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="645" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="665" rx="5" ry="5" width="100%" height="12" />
			<rect x="0" y="685" rx="5" ry="5" width="100%" height="12" />
		</ContentLoader>
)

export default SinglePostLoader
