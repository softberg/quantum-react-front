import { Link } from "react-router-dom";
import { Dropdown, Icon, NavItem } from 'react-materialize';

const Language = () => {

	return <>
		<Dropdown
			id="dropdown2"
			options={{
				alignment: 'left',
				autoTrigger: true,
				closeOnClick: true,
				constrainWidth: true,
				container: null,
				coverTrigger: true,
				hover: false,
				inDuration: 150,
				onCloseEnd: null,
				onCloseStart: null,
				onOpenEnd: null,
				onOpenStart: null,
				outDuration: 250
			}}
			trigger={<NavItem href="#!"><Icon left>language</Icon>Eng</NavItem>}
		>
			<Link to='#'>English</Link>
			<Link to='#'>Russian</Link>
			<Link to='#'>Armenian</Link>
		</Dropdown>
	</>
}

export default Language