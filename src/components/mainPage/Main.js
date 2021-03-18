import React from 'react';
import styled from 'styled-components';
import background from '../../resources/background.png';

const LogoDiv = styled.div`
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-image: url(${background});
	width: 100%;
	height: 100vh;
`;

// const P = styled.p`
// 	color: orange;
// 	padding: 20px;
// 	text-align: center;
// 	font-size: 3.5vw;
// `;

export const Main = () => {
	return (
		<div>
			<LogoDiv>{/* <P id={'welcomeText'}>Welcome to the Cool Job website! </P> */}</LogoDiv>
		</div>
	);
};

export default Main;
