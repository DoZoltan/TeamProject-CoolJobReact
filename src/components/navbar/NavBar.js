import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Drawer } from 'antd';

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
	const location = useLocation();
	const [visible, setVisible] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const showSecondDrawer = () => {
		setVisible2(true);
	};
	const onDrawerClose = () => {
		setVisible2(false);
	};
	return (
		<Header key='header' className='header'>
			<StickyHeader key='sticky-header'>
				<div className='mobileHidden'>
					<Menu theme='dark' mode='horizontal'>
						<Menu.Item key='1'>
							<Link id={'logo'} to='/main'>
								<i className='fas fa-bolt'></i>
							</Link>
						</Menu.Item>
						<Menu.Item key='2'>
							<Link id={'linkToMain'} to='/main'>
								Main
							</Link>
						</Menu.Item>
						<Menu.Item key='3'>
							<Link id={'linkToJobs'} to='/jobs'>
								Jobs
							</Link>
						</Menu.Item>
						<Menu.Item key='4'>
							<Link id={'linkToFavorites'} to='/favorite'>
								Favorites
							</Link>
						</Menu.Item>
						<Menu.Item key='5'>
							<Link id={'linkToAdd'} to='/add'>
								Add advertisement
							</Link>
						</Menu.Item>
						<Menu.Item key='6' style={{ float: 'right' }}>
							<Link id={'linkToRegistration'} to='/registration'>
								Registration
							</Link>
						</Menu.Item>
						<Menu.Item key='7' style={{ float: 'right' }}>
							<Link id={'linkToLogin'} to='/login'>
								Login
							</Link>
						</Menu.Item>
						<Menu.Item
							key='8'
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
				</div>
				<div className='mobileVisible'>
					<Menu theme='dark' mode='horizontal'>
						<Menu.Item key='1'>
							<Link id={'logo1'} to='/main'>
								<i className='fas fa-bolt'></i>
							</Link>
						</Menu.Item>
						<Menu.Item
							key='2'
							id={'reloadButton'}
							style={{ float: 'right' }}
							onClick={showDrawer}
						>
							<i className='fas fa-bars'></i>
						</Menu.Item>
					</Menu>
					<Drawer
						drawerStyle={{ backgroundColor: '#001529' }}
						placement='right'
						closable={false}
						onClose={onClose}
						visible={visible}
					>
						<Menu theme='dark' mode='vertical'>
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
							{location.pathname === '/jobs' && (
								<Menu.Item key='3' onClick={showSecondDrawer}>
									Search in jobs
								</Menu.Item>
							)}
							<Menu.Item key='4'>
								<Link id={'linkToFavorites'} to='/favorite'>
									Favorites
								</Link>
							</Menu.Item>
							<Menu.Item key='5'>
								<Link id={'linkToAdd'} to='/add'>
									Add advertisement
								</Link>
							</Menu.Item>
							<Menu.Item key='6'>
								<Link id={'linkToRegistration'} to='/registration'>
									Registration
								</Link>
							</Menu.Item>
							<Menu.Item key='7'>
								<Link id={'linkToLogin'} to='/login'>
									Login
								</Link>
							</Menu.Item>
							<Menu.Item
								key='8'
								id={'reloadButton'}
								style={{
									color: 'white',
									backgroundColor: '#2F4F4F',
								}}
								onClick={() => window.location.reload(false)}
							>
								Click to reload!
							</Menu.Item>
						</Menu>
					</Drawer>
				</div>
				<div className='filterBarVisible'>
					<Menu theme='dark' mode='horizontal'>
						<Menu.Item key='1'>
							<Link id={'logo'} to='/main'>
								<i className='fas fa-bolt'></i>
							</Link>
						</Menu.Item>
						{location.pathname === '/jobs' && (
							<Menu.Item key='2' id={'filterBarButton'} onClick={showSecondDrawer}>
								<i className='fas fa-search'></i>
							</Menu.Item>
						)}
						<Menu.Item key='3'>
							<Link id={'linkToMain'} to='/main'>
								Main
							</Link>
						</Menu.Item>
						<Menu.Item key='4'>
							<Link id={'linkToJobs'} to='/jobs'>
								Jobs
							</Link>
						</Menu.Item>
						<Menu.Item key='5'>
							<Link id={'linkToFavorites'} to='/favorite'>
								Favorites
							</Link>
						</Menu.Item>
						<Menu.Item key='6'>
							<Link id={'linkToAdd'} to='/add'>
								Add advertisement
							</Link>
						</Menu.Item>
						<Menu.Item key='7' style={{ float: 'right' }}>
							<Link id={'linkToRegistration'} to='/registration'>
								Registration
							</Link>
						</Menu.Item>
						<Menu.Item key='8' style={{ float: 'right' }}>
							<Link id={'linkToLogin'} to='/login'>
								Login
							</Link>
						</Menu.Item>
						<Menu.Item
							key='9'
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
					<Drawer
						placement='left'
						closable={false}
						onClose={onDrawerClose}
						visible={visible2}
					></Drawer>
				</div>
			</StickyHeader>
		</Header>
	);
};

export default NavBar;
