import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { TheProvider } from './Contexts/TheContext';
import { UserProvider } from './Contexts/UserContext';
import { FilterProvider } from './Contexts/FilterContext';
import { DisplayFilterBarProvider } from './Contexts/DisplayFilterBarContext';
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
			<UserProvider>
				<DisplayFilterBarProvider>
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
								<FilterProvider>
									<Route exact path='/jobs' component={JobsBox} />
									<Route exact path='/jobs/:id' component={DetailBox} />
									<Route exact path='/favorites' component={FavoriteBox} />
									<Route exact path='/favorites/:id' component={DetailBox} />
								</FilterProvider>
								<Route path='/add' component={Add} />
								<Route path='/login' component={LoginPage} />
								<Route path='/registration' component={RegistrationPage} />
							</div>
						</div>
					</Router>
				</DisplayFilterBarProvider>
			</UserProvider>
		</TheProvider>
	);
};

export default App;
