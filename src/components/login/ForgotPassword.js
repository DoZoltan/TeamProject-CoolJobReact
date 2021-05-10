import React from 'react';
import { Input, Button, Form, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class ForgotPassword extends React.Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<div id='forgotPassword'>
				<Button size='large' onClick={this.showModal}>
					Forgot Password
				</Button>

				<Modal
					title='Forgot password'
					visible={this.state.visible}
					onCancel={this.handleCancel}
					footer={null}
					destroyOnClose={true}
				>
					<Form
						name='forgot-password'
						className='forgot-password'
						initialValues={{
							remember: true,
						}}
						onFinish={this.onFinish}
					>
						<Form.Item
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your Username!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Username'
							/>
						</Form.Item>
						<Form.Item
							name='email'
							rules={[
								{
									required: true,
									message: 'Please input your E-mail!',
								},
							]}
						>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='email'
								placeholder='E-mail'
							/>
						</Form.Item>

						<Form.Item>
							<Button
								id='forgotPasswordButton'
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Send Email
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default ForgotPassword;
