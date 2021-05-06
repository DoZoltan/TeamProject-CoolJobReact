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

const LoginPage = () => {
	var canSend = true;
	var history = useHistory();
	const { Footer, Content } = Layout;

	let resultSample = {
		userName: '',
		password: '',
	};

	function handleChange(event) {
		resultSample[event.target.id] = event.target.value;
		document.getElementById(event.target.id).style.border = '1px solid black';
	}

	function handleSubmit() {
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
		}
	}

	return (
		<Layout>
			<Content style={{ marginLeft: 250, marginRight: 250 }}>
				<form method='post'>
					<fieldset>
						<legend>
							<h3 style={{ marginTop: 25 }}>Login</h3>
						</legend>
						<Div>
							<Label htmlFor='userName'>user name:</Label>
							<br />
							<Input type='text' id='userName' onChange={handleChange} />
						</Div>

						<Div>
							<Label htmlFor='password'>password:</Label>
							<br />
							<Input type='password' id='password' onChange={handleChange} />
						</Div>
					</fieldset>
				</form>
			</Content>
			<Footer style={{ alignSelf: 'center' }}>
				<Button id={'submitButton'} style={{ fontSize: 18 }} onClick={handleSubmit}>
					Login
				</Button>
			</Footer>
		</Layout>
	);
};

export default LoginPage;
