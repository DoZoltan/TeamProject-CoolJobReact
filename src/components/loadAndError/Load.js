import { Skeleton, Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const Load = () => {
	return (
		<div>
			<Row gutter={[16, 16]}>
				{[...Array(12)].map((x, i) => (
					<Col
						key={i + 'skeletonCol'}
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={window.location.pathname === '/jobs' ? { span: 6 } : { span: 4 }}
					>
						<Card
							key={i + 'skeleton'}
							style={{ width: 300, marginTop: 16 }}
							actions={[
								<SettingOutlined key='setting' />,
								<EditOutlined key='edit' />,
								<EllipsisOutlined key='ellipsis' />,
							]}
						>
							<Skeleton loading={true} avatar active></Skeleton>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Load;
