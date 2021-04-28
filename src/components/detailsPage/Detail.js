import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TheContext } from '../../Contexts/TheContext';
import 'antd/dist/antd.css';
import { Layout, Image, Button, Alert } from 'antd';
import UseAxiosPostForJob from '../../axios/useAxiosPostForJob';
import useAxiosDelete from '../../axios/useAxiosDelete';
import useAxiosGet from '../../axios/useAxiosGet';
import { useHistory } from 'react-router-dom';
import { GetDataFromFavorites } from '../../hook/GetDataFromFavorites';
import axios from 'axios';

const StyleImage = {
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '8px',
	width: '500px',
};
export const Detail = () => {
	const { Header, Footer, Content } = Layout;
	const { detail, axiosData, AxiosGet } = useContext(TheContext);
	const [successDisplay, setSuccessDisplay] = useState(false);
	const [successDeleteDisplay, setSuccessDeleteDisplay] = useState(false);
	const [existInFavorite, setExistInFavorite] = useState(false);

	const JobExistInFavorite = async () => {
		let fetchData = await axios.get(`https://localhost:44318/api/Favorites/${detail.id}/2`); // 0 --> the id of the user
		var count = Object.keys(fetchData.data).length;
		if (count > 0) {
			setExistInFavorite(true);
		} else {
			setExistInFavorite(false);
		}
	};
	useEffect(() => {
		JobExistInFavorite();
	}, []);

	const AddJobToFavoriteList = () => {
		UseAxiosPostForJob(detail, 'https://localhost:44318/api/Favorites');
	};

	const history = useHistory();

	const DeleteJobFromFavoriteList = async () => {
		await useAxiosDelete(`https://localhost:44318/api/Favorites/${detail.id}/2`);
		// history.go(-1);
		// 0 --> the id of the user
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
					{detail.title}
				</h1>
			</Header>
			<Content id={'content'}>
				<div style={{ paddingRight: '400px', paddingLeft: '400px' }}>
					<Image id={'imgLogo'} style={StyleImage} src={detail.company_logo} />
				</div>
				<div id={'textBox'} style={{ margin: '20px' }}>
					<h2 id={'companyName'}>Company name: {detail.company}</h2>
					<h3 id={'jobType'}>Job title: {detail.type}</h3>
					<h3 id={'jobLocation'}>Job location: {detail.location}</h3>
					<h4 id={'companyPage'}>
						company page: <a href={detail.company_url}>{detail.company_url}</a>
					</h4>
					<p
						id={'descriptionParagraph'}
						dangerouslySetInnerHTML={{ __html: detail.apply }}
					/>
					<h4 id={'jobDescription'}>descritpiton:</h4>
					<p dangerouslySetInnerHTML={{ __html: detail.description }} />
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
				Added at : {detail.created_at}
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
