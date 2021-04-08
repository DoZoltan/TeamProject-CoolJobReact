import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

export const RegistrationPage = () => {
	var canSend = true;
	var history = useHistory();
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

	let resultSample = {
		userName: '',
		firstName: '',
		lastName: '',
		email: '',
		birthDate: '',
		registrationDate: '',
		password: '',
		passwordAgain: '',
		id: '',
	};

	let result = {
		userName: '',
		firstName: '',
		lastName: '',
		email: '',
		birthDate: '',
		registrationDate: '',
		password: '',
		id: '',
	};

	function handleChange(event) {
		resultSample[event.target.id] = event.target.value;
		document.getElementById(event.target.id).style.border = '1px solid black';
	}

	function handleSubmit() {
		const newId = makeId(25);

		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		var fullTime = `${date} ${time}`;

		resultSample['id'] = newId;
		resultSample['registrationDate'] = fullTime;

		for (const [key, value] of Object.entries(resultSample)) {
			if (value.length < 1) {
				document.getElementById(key).style.border = '1px solid red';
				canSend = false;
			}

			if (key === 'passwordAgain' && resultSample['password'] !== value) {
				document.getElementById(key).style.border = '1px solid red';
				canSend = false;
			}
		}
		if (canSend === true) {
			// PostApiData(result, 'https://localhost:44318/api/Jobs');
			// window.location.reload(false);
			history.push('/login');
		} else {
			canSend = true;
			updateResult();
		}
	}

	function updateResult() {
		for (const [key] of Object.entries(result)) {
			result[key] = resultSample[key];
		}
	}

	return (
		<Layout>
			<Content style={{ marginLeft: 250, marginRight: 250 }}>
				<form method='post'>
					<fieldset>
						<legend>
							<h3 style={{ marginTop: 25 }}>Registration</h3>
						</legend>
						<Div>
							<Label htmlFor='userName'>user name:</Label>
							<br />
							<Input type='text' id='userName' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='firstName'>first name:</Label>
							<br />
							<Input type='text' id='firstName' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='lastName'>last name:</Label>
							<br />
							<Input type='text' id='lastName' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='birthDate'>birth date:</Label>
							<br />
							<Input type='text' id='birthDate' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='email'>email</Label>
							<br />
							<Input type='text' id='email' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='password'>password:</Label>
							<br />
							<Input type='password' id='password' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='passwordAgain'>password again:</Label>
							<br />
							<Input type='password' id='passwordAgain' onChange={handleChange} />
						</Div>
					</fieldset>
				</form>
			</Content>
			<Footer style={{ alignSelf: 'center' }}>
				<Button id={'submitButton'} style={{ fontSize: 18 }} onClick={handleSubmit}>
					Registration
				</Button>
			</Footer>
		</Layout>
	);
};

export default RegistrationPage;
