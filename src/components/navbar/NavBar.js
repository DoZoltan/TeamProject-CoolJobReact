import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Drawer } from 'antd';
import { DisplayFilterBarContext } from '../../Contexts/DisplayFilterBarContext';
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
	const { setShowFilterBarReverse } = useContext(DisplayFilterBarContext);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
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
							<Link id={'linkToFavorites'} to='/favorites'>
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
				</div>
				<div className='mobileVisible'>
					<Menu theme='dark' mode='horizontal'>
						<Menu.Item key='1'>
							<Link id={'logo1'} to='/main'>
								<i className='fas fa-bolt'></i>
							</Link>
						</Menu.Item>
						{location.pathname === '/jobs' && (
							<Menu.Item
								key='2'
								id={'filterBarButton'}
								onClick={setShowFilterBarReverse}
							>
								<i className='fas fa-search'></i>
							</Menu.Item>
						)}
						<Menu.Item
							key='10'
							id={'menuButton'}
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
								<Link id={'linkToFavorites'} to='/favorites'>
									Favorites
								</Link>
							</Menu.Item>
							<Menu.Item key='6'>
								<Link id={'linkToAdd'} to='/add'>
									Add advertisement
								</Link>
							</Menu.Item>
							<Menu.Item key='7'>
								<Link id={'linkToRegistration'} to='/registration'>
									Registration
								</Link>
							</Menu.Item>
							<Menu.Item key='8'>
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
							<Menu.Item
								key='2'
								id={'filterBarButton'}
								onClick={setShowFilterBarReverse}
							>
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
							<Link id={'linkToFavorites'} to='/favorites'>
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
				</div>
			</StickyHeader>
		</Header>
	);
};

export default NavBar;
