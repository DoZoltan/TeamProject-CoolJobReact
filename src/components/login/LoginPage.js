import React from 'react';
import { Input, Button, Checkbox, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

const LoginPage = () => {
	// let resultSample = {
	// 	userName: '',
	// 	password: '',
	// };

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	return (
		<div id='loginBox' className='block loginBlock'>
			<div className='container-login'>
				<div className='titleHolderLogin'>
					<h2>Login</h2>
					<p>Give your username and password for login!</p>
				</div>
				<Form
					name='normal_login'
					className='login-form'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
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
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name='remember' valuePropName='checked' noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<ForgotPassword />
					</Form.Item>
					<Form.Item>
						<Button
							id='loginButton'
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Log in
						</Button>
						<br></br>
						Or <Link to='/registration'>register now!</Link>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
