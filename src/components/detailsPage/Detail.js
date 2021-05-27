import React, { useContext, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Image, Button, Popconfirm, message } from 'antd';
import UseAxiosPostForJob from '../../axios/useAxiosPostForJob';
import useAxiosDelete from '../../axios/useAxiosDelete';
import { useHistory } from 'react-router-dom';
import UseSimpleGetAxios from '../../axios/useSimpleGetAxios';
import { UserContext } from '../../Contexts/UserContext';

const Detail = (props) => {
	const { Header, Footer, Content } = Layout;
	const [existInFavorite, setExistInFavorite] = useState(false);
	const { user } = useContext(UserContext);
	const history = useHistory();

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
		message.success('Added to favorites');
	};

	const DeleteJobFromFavoriteList = async () => {
		// The user is a simple number now
		// After the user will be an object then we have to get the ID property of it
		await useAxiosDelete(`https://localhost:44318/api/Favorites/${props.details.id}/${user}`);
		message.error('Deleted from favorites');
	};

	const BackTo = () => {
		let pathName = history.location.pathname;
		if (pathName.includes('jobs')) {
			history.push('/jobs');
		} else {
			history.push('/favorites');
		}
	};

	return (
		<Layout>
			<Header id={'detailHeader'}>
				{/* <Link to={history.go(-1)}> */}
				{/* <Link to={onJob === true ? '/jobs' : '/favorite'}> */}
				<Button
					onClick={BackTo}
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
					{props.details.company}
				</h1>
			</Header>
			<div id={'textContainer'}>
				<Content id={'content'}>
					<div id={'imgContainer'}>
						<Image className={'imgLogo'} src={props.details.company_logo} />
					</div>
					<div id={'textBox'}>
						<h2 id={'jobTitleBox'}>
							Job title: <p id={'jobTitle'}> {props.details.title}</p>
						</h2>
						<h3 id={'jobType'}>Job type: {props.details.type}</h3>
						<h3 id={'jobLocation'}>Job location: {props.details.location}</h3>
						<h4 id={'companyPage'}>
							company page: <a href={props.details.company_url}>Link</a>
						</h4>
						<p
							id={'applyParagraph'}
							dangerouslySetInnerHTML={{ __html: props.details.apply }}
						/>
						<h4 id={'jobDescription'}>descritpiton:</h4>
						<p dangerouslySetInnerHTML={{ __html: props.details.description }} />
					</div>
				</Content>
				<Footer id={'detailFooter'} style={{ padding: '0px' }}>
					Added at : {props.details.created_at}
					<Popconfirm
						onConfirm={() => {
							AddJobToFavoriteList();
							setExistInFavorite(true);
						}}
						title='Are you sure add to favorites?'
						okText='Yes'
						cancelText='No'
					>
						<Button
							id={'addToFavoriteButton'}
							style={{
								color: 'white',
								backgroundColor: '#2F4F4F',

								float: 'right',
								display: `${existInFavorite === false ? 'block' : 'none'}`,
							}}
						>
							Add to favorites
						</Button>
					</Popconfirm>
					<Popconfirm
						title='Are you sure delete from favorites?'
						okText='Yes'
						onConfirm={() => {
							DeleteJobFromFavoriteList();
							setExistInFavorite(false);
						}}
						cancelText='No'
					>
						<Button
							id={'deleteFromFavoriteButton'}
							style={{
								color: 'white',
								backgroundColor: '#2F4F4F',

								float: 'right',

								display: `${existInFavorite === true ? 'block' : 'none'}`,
							}}
						>
							Delete from favorites
						</Button>
					</Popconfirm>
				</Footer>
			</div>
		</Layout>
	);
};

export default Detail;
