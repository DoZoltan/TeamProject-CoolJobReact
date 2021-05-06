import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Col } from 'antd';
import { TheContext } from '../../Contexts/TheContext';

const StyledImage = styled.img`
	margin-top: 1px;
	width: 12em;
	height: 10em;
	display: block;
	margin-left: auto;
	margin-right: auto;
`;

const JobCard = (props) => {
	const { setDetail } = useContext(TheContext);
	const { Meta } = Card;

	return (
		<Col style={{ padding: '15px' }} span={6}>
			<Link onClick={() => setDetail(props)} to={'/detail/' + props.id}>
				<Card
					id={props.id}
					key={props.id}
					headStyle={{ textAlign: 'center' }}
					hoverable
					style={{ width: 280, height: 300 }}
					cover={
						<StyledImage id={'img' + props.id} alt='example' src={props.company_logo} />
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
