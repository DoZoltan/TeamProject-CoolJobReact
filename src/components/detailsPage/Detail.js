import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TheContext } from '../../Contexts/TheContext';
import 'antd/dist/antd.css';
import { Layout, Image, Button, Alert } from 'antd';
import { OnJobContext } from '../../Contexts/OnJobContext';
import { PostApiData } from '../../hook/PostApiData';
import { DeleteApiData } from '../../hook/DeleteApiData';
import { useHistory } from 'react-router-dom';
import { GetDataFromFavorites } from '../../hook/GetDataFromFavorites';

const StyleImage = {
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '8px',
	width: '500px',
};
export const Detail = () => {
	const { Header, Footer, Content } = Layout;
	const { detail } = useContext(TheContext);
	const { onJob } = useContext(OnJobContext);
	const [successDisplay, setSuccessDisplay] = useState(false);
	const [successDeleteDisplay, setSuccessDeleteDisplay] = useState(false);
	const [existInFavorite, setExistInFavorite] = useState(false);

	useEffect(() => {
		const jobExistInFavorite = async () => {
			let fetchData = await GetDataFromFavorites(
				`https://localhost:44318/api/Favorites/${detail.id}/2`
			); // 0 --> the id of the user
			var count = Object.keys(fetchData.data).length;
			if (count > 0) {
				setExistInFavorite(true);
			} else {
				setExistInFavorite(false);
			}
		};
		jobExistInFavorite();
	}, [detail.id]);

	const AddJobToFavoriteList = () => {
		PostApiData(detail, 'https://localhost:44318/api/Favorites');
	};

	const history = useHistory();

	const DeleteJobFromFavoriteList = async () => {
		await DeleteApiData(`https://localhost:44318/api/Favorites/${detail.id}/2`);
		if (onJob === false) history.push('/favorite');
		// 0 --> the id of the user
	};

	const aLertTimeoutForAddSuccess = () => {
		setTimeout(() => {
			setSuccessDisplay(false);
		}, 2000);
	};

	const aLertTimeoutForDeleteSuccess = () => {
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
				<Link to={onJob === true ? '/jobs' : '/favorite'}>
					<Button
						id={'backToButton'}
						style={{
							color: 'white',
							backgroundColor: '#2F4F4F',
							marginTop: '15px',
							float: 'right',
						}}
					>
						{onJob === true ? 'Back to Jobs' : 'Back to favorites'}
					</Button>
				</Link>
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
				Added at : {detail.created_at} {onJob === true}
				<Button
					id={'addToFavoriteButton'}
					style={{
						color: 'white',
						backgroundColor: '#2F4F4F',
						marginRight: '140px',
						float: 'right',
						display: `${
							// onJob === true && successDisplay === false ? 'block' : 'none'
							existInFavorite === false && successDisplay === false ? 'block' : 'none'
						}`,
					}}
					onClick={() => {
						aLertTimeoutForAddSuccess();
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
						// display: `${onJob === true ? 'none' : 'block'}`,
						display: `${existInFavorite === true ? 'block' : 'none'}`,
					}}
					onClick={() => {
						aLertTimeoutForDeleteSuccess();
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
