import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Col } from 'antd';
import { JobDetailContext } from '../../Contexts/JobDetailContext';
import { GetApiData } from '../../hook/GetApiData';

export const JobCard = (props) => {
	const { setDetail } = useContext(JobDetailContext);
	const { Meta } = Card;

	const StyledImage = styled.img`
		margin-top: 1px;
		width: 12em;
		height: 10em;
		display: block;
		margin-left: auto;
		margin-right: auto;
	`;

	const [fetchData] = GetApiData(`https://localhost:44318/api/Jobs/${props.id}`);

	return (
		<Col style={{ padding: '15px' }} span={6}>
			<Link onClick={() => setDetail(fetchData)} to={'/detail/' + props.id}>
				<Card
					headStyle={{ textAlign: 'center' }}
					hoverable
					style={{ width: 280, height: 300 }}
					cover={<StyledImage alt='example' src={props.company_logo} />}
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
