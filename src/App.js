import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { TheProvider } from './Contexts/TheContext';
import './App.css';
import 'antd/dist/antd.css';
import NavBar from './components/navbar/NavBar';
import Main from './components/mainPage/Main';
import JobsBox from './components/jobsPage/JobsBox';
import DetailBox from './components/detailsPage/DetailBox';
import FavoriteBox from './components/favoritePage/FavoriteBox';
import Add from './components/addAdvertisement/Add';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';

const App = () => {
	return (
		<TheProvider>
			<Router>
				<div>
					<div>
						<NavBar />
					</div>
					<div>
						<Route exact path='/'>
							<Redirect to='/main' />
						</Route>
						<Route path='/main' component={Main} />
						<Route path='/jobs' component={JobsBox} />
						<Route path='/favorite' component={FavoriteBox} />
						<Route path='/add' component={Add} />
						<Route path='/detail' component={DetailBox} />
						<Route path='/login' component={LoginPage} />
						<Route path='/registration' component={RegistrationPage} />
					</div>
				</div>
			</Router>
		</TheProvider>
	);
};

export default App;
