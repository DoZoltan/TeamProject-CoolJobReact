import React from 'react';
import Agreement from '../registration/Agreement';
import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd';
const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const RegistrationPage = () => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select
				style={{
					width: 70,
				}}
			>
				<Option value='36'>+36</Option>
			</Select>
		</Form.Item>
	);

	return (
		<div className='block registrationBlock'>
			<div className='titleHolderLogin'>
				<h2>Registration</h2>
				<p>Give your data for successful registration!</p>
			</div>
			<Form
				{...formItemLayout}
				form={form}
				name='register'
				onFinish={onFinish}
				initialValues={{
					residence: ['zhejiang', 'hangzhou', 'xihu'],
					prefix: '+36',
				}}
				scrollToFirstError
			>
				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='password'
					label='Password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='confirm'
					label='Confirm Password'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}

								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='nickname'
					label='Nickname'
					tooltip='What do you want others to call you?'
					rules={[
						{
							required: true,
							message: 'Please input your nickname!',
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='country'
					label='Country'
					rules={[
						{
							required: true,
							message: 'Please input your Country!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='city'
					label='Actual city'
					rules={[
						{
							required: true,
							message: 'Please select your habitual residence!',
						},
					]}
				>
					{/* <AutoComplete
						value={inputLocationValue}
						id={'locationFilter'}
						dropdownClassName='certain-category-search-dropdown'
						dropdownMatchSelectWidth={300}
						style={{
							width: 180,
						}}
						options={optionsLocation}
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						}
						onChange={changeCardListByLocation}
					>
						<Input.Search id={'locationInput'} size='large' placeholder='Location' />
					</AutoComplete> */}
					<Input />
				</Form.Item>

				<Form.Item
					name='phone'
					label='Phone Number'
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
						},
					]}
				>
					<Input
						addonBefore={prefixSelector}
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>

				<Form.Item label='Captcha' extra='We must make sure that your are a human.'>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								name='captcha'
								noStyle
								rules={[
									{
										required: true,
										message: 'Please input the captcha you got!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Button>Get captcha</Button>
						</Col>
					</Row>
				</Form.Item>

				<Form.Item
					name='agreementCheck'
					valuePropName='checked'
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(new Error('Should accept agreement')),
						},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox style={{ display: 'in-line' }}>
						I have read the <Agreement />
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type='primary' htmlType='submit'>
						Register
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RegistrationPage;
