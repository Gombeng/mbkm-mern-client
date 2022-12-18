import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, Gap, Input, Message } from '../../components/Components';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const UploadSK = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	// console.log(mhsInfo);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [file, setFile] = useState(null);


	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	let formData = new FormData();
	// 	formData.append('skAcc', file);

	// 	try {
	// 		const config = {
	// 			headers: {
	// 				'Content-type': 'multipart/form-data',
	// 			},
	// 		};

	// 		setLoading(true);

	// 		const { user } = await axios.patch(
	// 			`http://localhost:8910/api/student/upload/${_id}`,
	// 			{
	// 				file,
	// 			},
	// 			config
	// 		);

	// 		console.log(user);
	// 		console.log(file);
	// 		setSuccess('Berhasil Upload SK');
	// 	} catch (error) {
	// 		setLoading(false);
	// 		console.log(error.response);
	// 	}
	// };

	return (
		<div>
			<Helmet>
				<title>Upload SK | Lapor MBKM</title>
			</Helmet>

			<div>
				<h3 className="mb-1">Silahkan Upload SK diterima mitra</h3>

				<hr className="mb-1" />
				{/* <Gap height={20} /> */}

				<h1>aku rase upload sk ni join di dashboard aje</h1>

				<form
					// onSubmit={handleSubmit}

					encType="multipart/form-data"
				>
					{error && <Message className="mb-1 error">{error}</Message>}
					<Gap height={30} />

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

