import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

const StickyHeader = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`;

const NavBar = () => {
	const { Header } = Layout;
	return (
		<Header key='header' className='header'>
			<StickyHeader key='sticky-header'>
				<Menu theme='dark' mode='horizontal'>
					<Menu.Item key='1'>
						<Link id={'linkToMain'} to='/main'>
							Main
						</Link>
					</Menu.Item>
					<Menu.Item key='2'>
						<Link id={'linkToJobs'} to='/jobs'>
							Jobs
						</Link>
					</Menu.Item>
					<Menu.Item key='3'>
						<Link id={'linkToFavorites'} to='/favorite'>
							Favorites
						</Link>
					</Menu.Item>
					<Menu.Item key='4'>
						<Link id={'linkToAdd'} to='/add'>
							Add advertisement
						</Link>
					</Menu.Item>
					<Menu.Item key='5' style={{ float: 'right' }}>
						<Link id={'linkToRegistration'} to='/registration'>
							Registration
						</Link>
					</Menu.Item>
					<Menu.Item key='6' style={{ float: 'right' }}>
						<Link id={'linkToLogin'} to='/login'>
							Login
						</Link>
					</Menu.Item>

					<Menu.Item
						key='7'
						id={'reloadButton'}
						style={{
							color: 'white',
							backgroundColor: '#2F4F4F',
							float: 'right',
						}}
						onClick={() => window.location.reload(false)}
					>
						Click to reload!
					</Menu.Item>
				</Menu>
			</StickyHeader>
		</Header>
	);
};

export default NavBar;
