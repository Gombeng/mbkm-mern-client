import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button, Gap, Input, Message } from '../../components/Components';

const Logsheet = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				'http://localhost:8910/api/student/login',
				{
					email,
					password,
				},
				config
			);

			console.log(data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			setError(error.response.data.message);
		}
	};

	return (
		<div>
			<Helmet>
				<title>Logsheet | Lapor MBKM</title>
			</Helmet>

			<div>
				<h2 className="mb-1">Silahkan Upload Logsheet harian</h2>

				<hr className="mb-1" />

				<form className="right" onSubmit={submitHandler}>
					<h2 className="mb-1">Silahkan Masuk</h2>

					{error && <Message className="mb-1 error">{error}</Message>}

					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						type="email"
						placeholder="user@gmail.com"
					/>
					<Gap height={20} />

					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label="Kata Sandi"
						type="password"
						placeholder="********"
					/>
					<Gap height={20} />

					<Button
						title={loading ? <ClipLoader size={20} /> : 'Upload'}
						className="button mr-1"
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default Logsheet;
