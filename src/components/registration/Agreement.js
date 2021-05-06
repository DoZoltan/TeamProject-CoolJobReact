import React from 'react';
import { Button, Modal } from 'antd';

class Agreement extends React.Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<div id='agreement'>
				<Button size='small' onClick={this.showModal}>
					Agreement
				</Button>

				<Modal
					title='agreement'
					visible={this.state.visible}
					onCancel={this.handleCancel}
					footer={null}
					destroyOnClose={true}
				>
					<p>You agree with we are the best team ever.</p>
				</Modal>
			</div>
		);
	}
}

export default Agreement;
