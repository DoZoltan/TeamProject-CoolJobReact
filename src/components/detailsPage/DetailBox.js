import React, { useContext } from 'react';
import styled from 'styled-components';
import Detail from './Detail';
import { BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';

const DetailBox = () => {
	const { detail, axiosIsLoading, axiosError } = useContext(TheContext);

	return (
		<React.Fragment>
			{axiosError && <Error />}
			{axiosIsLoading && <Load />}
			{!axiosIsLoading && detail && <Detail details={detail} />}
			<BackTop />
		</React.Fragment>
	);
};

export default DetailBox;
