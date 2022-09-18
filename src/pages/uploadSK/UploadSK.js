import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, Gap, Input, Message } from '../../components/Components';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const UploadSK = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	console.log(mhsInfo);
	let { _id, skAcc } = mhsInfo;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [file, setFile] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('skAcc', file);

		try {
			const config = {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			};

			setLoading(true);

			const { user } = await axios.patch(
				`http://localhost:8910/api/student/update/${_id}`,
				{
					file,
				},
				config
			);

			if (!user) {
				setError('Something wrong!');
				setLoading(false);
			}

			setLoading(false);
			console.log(user);
			// const updatedUser = {
			// 	...JSON.parse(localStorage.getItem('mhsInfo')),
			// 	...user,
			// };
			// localStorage.setItem('mhsInfo', JSON.stringify(user));
			setSuccess('Berhasil Upload SK');
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}
	};

	return (
		<div>
			<Helmet>
				<title>Upload SK | Lapor MBKM</title>
			</Helmet>

			{!skAcc ? (
				<div>
					<h2 className="mb-1">Silahkan Upload SK diterima mitra</h2>

					<hr className="mb-1" />
					{/* <Gap height={20} /> */}
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						{error && <Message className="mb-1 error">{error}</Message>}

						<Input
							className="border-none p-0"
							type="file"
							accept=".png, .jpg, .jpeg"
							name="file"
							onChange={(e) => {
								setFile(e.target.files[0]);
							}}
							required
						/>
						<Gap height={30} />

						<Button
							title={loading ? <ClipLoader size={20} /> : 'Upload SK'}
							className="button mr-1"
							type="submit"
						/>
					</form>
				</div>
			) : (
				<Box>
					{success && <Message className="mb-1 success">{success}</Message>}
					<h1 className="mb-1">SK diterima mitra sudah di upload</h1>
					<NavLink to="/isi-borang">
						<Button title="Isi Borang" />
					</NavLink>
				</Box>
			)}
		</div>
	);
};

export default UploadSK;

const Box = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 70vh;

	a {
		text-decoration: none;
		color: black;
	}
`;
