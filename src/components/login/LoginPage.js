import React from 'react';
import { Input, Button, Checkbox, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import UseAxiosPostForLogin from '../../axios/useAxiosPostForLogin';

const LoginPage = () => {
	let resultSample = {
		'Email': '', //kumkvatmail@gmail.com
		'Password': '', //Kumkvat-1
	};

	const onFinish = (values: any) => {
		resultSample.Email = values.email;
		resultSample.Password = values.password;
		console.log(UseAxiosPostForLogin(resultSample, 'https://localhost:44318/api/users/login'));
	};

	return (
		<div id='loginBox' className='block loginBlock'>
			<div className='container-login'>
				<div className='titleHolderLogin'>
					<h2>Login</h2>
					<p>Give your E-mail and password for login!</p>
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
						name='email'
						rules={[
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='E-mail'
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
