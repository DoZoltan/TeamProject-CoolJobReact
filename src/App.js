import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { JobProvider } from './Contexts/JobContext';
//import { FavoriteJobProvider } from './Contexts/FavoriteJobContext';
import { OnJobProvider } from './Contexts/OnJobContext';
//import { FilteredJobProvider } from './Contexts/FilteredJobsContext';

import { TheProvider } from './Contexts/TheContext';

import NavBar from './components/navbar/NavBar';
import Main from './components/mainPage/Main';
import JobsBox from './components/jobsPage/JobsBox';
import DetailBox from './components/detailsPage/DetailBox';
import FavoriteBox from './components/favoritePage/FavoriteBox';
import JobDetailProvider from './Contexts/JobDetailContext';
import Add from './components/addAdvertisement/Add';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';

const App = () => {
	return (
		<TheProvider>
			<OnJobProvider>
				<JobDetailProvider>
					<Router>
						<JobProvider>
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
						</JobProvider>
					</Router>
				</JobDetailProvider>
			</OnJobProvider>
		</TheProvider>
	);
};

export default App;
