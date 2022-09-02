import React from 'react'

const About = () => {
	return <>
		<>
			<div className="main-wrapper teal accent-4">
				<div className="container wrapper center-align white-text">
					<h1>About</h1>
					<div className="card teal accent-4">
						<div className="card-content">
							<h6>Quantum is a free, open-source PHP web framework under MIT license, specially designed to develop very fast web applications with modular structure. With Quantum it’s easy to start any kind of project immediately, wather it's regular websites or complex API based service, at the same time it allows to keep the code clean, organized through all the development process.</h6>
							<h4>Version</h4>
							<h6>Current version is: 2.7</h6>
							<h4>Installation</h4>
							<ul className="step-list">
								<li>
									<h6>Create new project</h6>
									<code>&gt; composer create-project quantum/project [project name]</code>
								</li>
								<li>
									<h6>Run the project</h6>
									<code>&gt; php qt serve</code>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<ul className="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</>
	</>
}

export default About