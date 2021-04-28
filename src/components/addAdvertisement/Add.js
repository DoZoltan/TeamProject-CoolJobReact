import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import styled from 'styled-components';
import UseAxiosPostForJob from '../../axios/useAxiosPostForJob';

const Div = styled.div`
	margin-bottom: 20px;
`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
`;

const Input = styled.input`
	width: 100%;
	font-size: 14px;
`;

const Textarea = styled.textarea`
	width: 100%;
	font-size: 14px;
	height: 100px;
`;

export const Add = () => {
	var canSend = true;
	const { Footer, Content } = Layout;

	function makeId(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	let result = {
		company: '',
		company_url: '',
		company_logo: '',
		location: '',
		type: '',
		title: '',
		description: '',
		how_to_apply: '',
		id: '',
		url: '',
		created_at: '',
	};

	function handleChange(event) {
		result[event.target.id] = event.target.value;
		document.getElementById(event.target.id).style.border = '1px solid black';
	}

	function handleSubmit() {
		const newId = makeId(25);
		const url = `https://jobs.github.com/positions/${newId}`;

		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		var fullTime = `${date} ${time}`;

		result['id'] = newId;
		result['url'] = url;
		result['created_at'] = fullTime;

		for (const [key, value] of Object.entries(result)) {
			if (value.length < 1) {
				document.getElementById(key).style.border = '1px solid red';
				canSend = false;
			}

			if (
				(key === 'company_url' && !isValidHttpUrl(value)) ||
				(key === 'company_logo' && !isValidHttpUrl(value))
			) {
				document.getElementById(key).style.border = '1px solid red';
				canSend = false;
			}
		}
		if (canSend === true) {
			UseAxiosPostForJob(result, 'https://localhost:44318/api/Jobs');
			window.location.reload(false);
		} else {
			canSend = true;
		}
	}

	function isValidHttpUrl(string) {
		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}

		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	return (
		<Layout>
			<Content style={{ marginLeft: 250, marginRight: 250 }}>
				<form method='post'>
					<fieldset>
						<legend>
							<h3 style={{ marginTop: 25 }}>Add new advertisement</h3>
						</legend>
						<Div>
							<Label htmlFor='company'>Company name:</Label>
							<br />
							<Input type='text' id='company' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='company_url'>Website URL:</Label>
							<br />
							<Input type='text' id='company_url' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='company_logo'>Company logo URL:</Label>
							<br />
							<Input type='text' id='company_logo' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='location'>Location:</Label>
							<br />
							<Input type='text' id='location' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='type'>Employment type:</Label>
							<br />
							<Input type='text' id='type' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='title'>Position:</Label>
							<br />
							<Input type='text' id='title' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='description'>Description:</Label>
							<br />
							<Textarea
								type='text'
								id='description'
								onChange={handleChange}
							></Textarea>
						</Div>

						<Div>
							<Label htmlFor='how_to_apply'>How to apply</Label>
							<br />
							<Input type='text' id='how_to_apply' onChange={handleChange} />
						</Div>
					</fieldset>
				</form>
			</Content>
			<Footer style={{ alignSelf: 'center' }}>
				<Button id={'submitButton'} style={{ fontSize: 18 }} onClick={handleSubmit}>
					Send advertisement
				</Button>
			</Footer>
		</Layout>
	);
};

export default Add;
