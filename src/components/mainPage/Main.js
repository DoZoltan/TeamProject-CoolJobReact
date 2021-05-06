import React from 'react';

export const Main = () => {
	return (
		<div className='main'>
			<video src='/videos/p.mp4' autoPlay loop muted />
			<h1>JOB ADVENTURE AWAITS</h1>
			<p>Welcome to the Cool Job website!</p>
			{/* <LogoDiv><P id={'welcomeText'}>Welcome to the Cool Job website! </P></LogoDiv> */}
		</div>
	);
};

export default Main;
