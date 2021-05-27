import React, { useState } from 'react';
import { AutoComplete, Form, Input, Button } from 'antd';
import UseAxiosPostForJob from '../../axios/useAxiosPostForJob';

const { TextArea } = Input;

const Add = () => {
	const [autoCompleteResult, setAutoCompleteResult] = useState([]);

	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
		}
	};

	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}));

	let result = {
		company: '',
		company_url: '',
		company_logo: '',
		location: '',
		type: '',
		title: '',
		description: '',
		how_to_apply: '',
		url: '',
		created_at: '',
	};

	const onFinish = (values) => {
		const url = `https://jobs.github.com/positions`;
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		var fullTime = `${date} ${time}`;

		result['url'] = url;
		result['created_at'] = fullTime;
		result['company'] = values.company;
		result['company_url'] = values.company_url;
		result['company_logo'] = values.company_logo;
		result['location'] = values.location;
		result['type'] = values.type;
		result['title'] = values.title;
		result['description'] = values.description;
		result['how_to_apply'] = values.how_to_apply;

		UseAxiosPostForJob(result, 'https://localhost:44318/api/Jobs');
		setTimeout(500);
		window.location.href = '/jobs';
	};

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

	return (
		<div className='block registrationBlock'>
			<div className='titleHolderLogin'>
				<h2>Add new advertisement</h2>
			</div>
			<Form
				autoComplete='off'
				{...formItemLayout}
				name='add-advertisement'
				onFinish={onFinish}
				scrollToFirstError
			>
				<Form.Item
					name='company'
					label='Company name'
					rules={[
						{
							required: true,
							message: 'Please input your company name!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='company_url'
					label='Website'
					rules={[{ required: true, message: 'Please input website!' }]}
				>
					<AutoComplete
						options={websiteOptions}
						onChange={onWebsiteChange}
						placeholder='Website'
					>
						<Input />
					</AutoComplete>
				</Form.Item>
				<Form.Item
					name='company_logo'
					label='Logo'
					rules={[{ required: true, message: 'Please input Logo!' }]}
				>
					<AutoComplete
						options={websiteOptions}
						onChange={onWebsiteChange}
						placeholder='Logo'
					>
						<Input />
					</AutoComplete>
				</Form.Item>
				<Form.Item
					name='location'
					label='Location'
					tooltip='Where is your company/office?'
					rules={[
						{
							required: true,
							message: 'Please input your company location!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='type'
					label='Employment type:'
					rules={[
						{
							required: true,
							message: 'Please input Employment type!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='title'
					label='Position'
					rules={[
						{
							required: true,
							message: 'Please input position!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='description'
					label='Description'
					rules={[
						{
							min: 5,
							message: 'Input minimum 5 character!',
						},
						{
							required: true,
							message: 'Please input description about the job!',
						},
					]}
				>
					<TextArea placeholder='Description' />
				</Form.Item>
				<Form.Item
					name='how_to_apply'
					label='How to apply'
					rules={[
						{
							min: 5,
							message: 'Input minimum 5 character!',
						},
						{
							required: true,
							message: 'Please input how to apply for the job!',
						},
					]}
				>
					<TextArea placeholder='How to apply' />
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type='primary' htmlType='submit'>
						Add advertisement
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Add;
