import React, { useContext, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Image, Button, Alert } from 'antd';
import UseAxiosPostForJob from '../../axios/useAxiosPostForJob';
import useAxiosDelete from '../../axios/useAxiosDelete';
import { useHistory } from 'react-router-dom';
import UseSimpleGetAxios from '../../axios/useSimpleGetAxios';
import { UserContext } from '../../Contexts/UserContext';


const Detail = (props) => {
	const { Header, Footer, Content } = Layout;
	const [successDisplay, setSuccessDisplay] = useState(false);
	const [successDeleteDisplay, setSuccessDeleteDisplay] = useState(false);
	const [existInFavorite, setExistInFavorite] = useState(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		// The user is a simple number now
		// After the user will be an object then we have to get the ID property of it
		const JobExistInFavorite = async () => {
			let fetchData = await UseSimpleGetAxios(
				`https://localhost:44318/api/Favorites/${props.details.id}/${user}`
			);
			var count = Object.keys(fetchData.data).length;
			if (count > 0) {
				setExistInFavorite(true);
			} else {
				setExistInFavorite(false);
			}
		};
		JobExistInFavorite();
	}, [props.details.id, user]);

	const AddJobToFavoriteList = () => {
		UseAxiosPostForJob(props.details, 'https://localhost:44318/api/Favorites');
	};

	const history = useHistory();

	const DeleteJobFromFavoriteList = async () => {
		// The user is a simple number now
		// After the user will be an object then we have to get the ID property of it
		await useAxiosDelete(`https://localhost:44318/api/Favorites/${props.details.id}/${user}`);
	};

	const alertTimeoutForAddSuccess = () => {
		setTimeout(() => {
			setSuccessDisplay(false);
		}, 2000);
	};

	const alertTimeoutForDeleteSuccess = () => {
		setTimeout(() => {
			setSuccessDeleteDisplay(false);
		}, 2000);
	};

	const SuccessAlertStyle = {
		position: 'fixed',
		display: `${successDisplay === true ? 'block' : 'none'}`,
		zIndex: '2',
		right: '8%',
		bottom: '2%',
		width: '300px',
		textAlign: 'center',
	};

	const SuccessDeleteAlertStyle = {
		position: 'fixed',
		display: `${successDeleteDisplay === true ? 'block' : 'none'}`,
		zIndex: '2',
		right: '8%',
		bottom: '2%',
		width: '300px',
		textAlign: 'center',
	};

	return (
		<Layout>
			<Header id={'header'} style={{ color: '#F5FFFA', backgroundColor: '#000080' }}>
				{/* <Link to={history.go(-1)}> */}
				{/* <Link to={onJob === true ? '/jobs' : '/favorite'}> */}
				<Button
					onClick={() => history.go(-1)}
					id={'backToButton'}
					style={{
						color: 'white',
						backgroundColor: '#2F4F4F',
						marginTop: '15px',
						float: 'right',
					}}
				>
					Back
				</Button>
				{/* </Link> */}
				<h1 id={'headerTitle'} style={{ color: '#F5FFFA' }}>
					{props.details.title}
				</h1>
			</Header>
			<Content id={'content'}>
				<div style={{ paddingRight: '400px', paddingLeft: '400px' }}>
					<Image id={'imgLogo'} src={detail.company_logo} />
				</div>
				<div id={'textBox'} style={{ margin: '20px' }}>
					<h2 id={'companyName'}>Company name: {props.details.company}</h2>
					<h3 id={'jobType'}>Job title: {props.details.type}</h3>
					<h3 id={'jobLocation'}>Job location: {props.details.location}</h3>
					<h4 id={'companyPage'}>
						company page:{' '}
						<a href={props.details.company_url}>{props.details.company_url}</a>
					</h4>
					<p
						id={'descriptionParagraph'}
						dangerouslySetInnerHTML={{ __html: props.details.apply }}
					/>
					<h4 id={'jobDescription'}>descritpiton:</h4>
					<p dangerouslySetInnerHTML={{ __html: props.details.description }} />
				</div>
				<Alert
					id={'successAlert'}
					style={SuccessAlertStyle}
					message='Added to favorite jobs'
					type='success'
					showIcon
				/>
				<Alert
					id={'deleteAlert'}
					style={SuccessDeleteAlertStyle}
					message='Deleted from favorite jobs'
					type='error'
					showIcon
				/>
			</Content>
			<Footer id={'detailFooter'}>
				Added at : {props.details.created_at}
				<Button
					id={'addToFavoriteButton'}
					style={{
						color: 'white',
						backgroundColor: '#2F4F4F',
						marginRight: '140px',
						float: 'right',
						display: `${
							existInFavorite === false && successDisplay === false ? 'block' : 'none'
						}`,
					}}
					onClick={() => {
						alertTimeoutForAddSuccess();
						setSuccessDisplay(true);
						AddJobToFavoriteList();
						setExistInFavorite(true);
					}}
				>
					Add to favorites
				</Button>
				<Button
					id={'deleteFromFavoriteButton'}
					style={{
						color: 'white',
						backgroundColor: '#2F4F4F',
						marginRight: '140px',
						float: 'right',

						display: `${existInFavorite === true ? 'block' : 'none'}`,
					}}
					onClick={() => {
						alertTimeoutForDeleteSuccess();
						setSuccessDeleteDisplay(true);
						DeleteJobFromFavoriteList();
						setExistInFavorite(false);
					}}
				>
					Delete from favorites
				</Button>
			</Footer>
		</Layout>
	);
};

export default Detail;
