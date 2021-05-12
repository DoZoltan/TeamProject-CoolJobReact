//import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Col } from 'antd';
//import { TheContext } from '../../Contexts/TheContext';
import { useHistory } from 'react-router-dom';

const StyledImage = styled.img`
	height: 10em;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
`;

const JobCard = (props) => {
	//const { setDetail } = useContext(TheContext); //remove it
	const { Meta } = Card;

	const history = useHistory();

	return (
		<Col
			xs={{ span: 24 }}
			sm={{ span: 12 }}
			md={{ span: 8 }}
			lg={{ span: 6 }}
			xl={window.location.pathname === '/jobs' ? { span: 6 } : { span: 4 }}
		>
			<Link to={`${history.location.pathname}/${props.id}`}>
				<Card
					id={props.id}
					key={props.id}
					headStyle={{ textAlign: 'center' }}
					hoverable
					cover={
						<StyledImage
							style={{ maxWidth: '300px' }}
							id={'img' + props.id}
							alt='example'
							src={props.company_logo}
						/>
					}
					title={props.location}
				>
					<Meta
						style={{ textAlign: 'center' }}
						title={props.title}
						description={props.type}
					/>
				</Card>
			</Link>
		</Col>
	);
};

export default JobCard;
