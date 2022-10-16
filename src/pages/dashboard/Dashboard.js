import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Components';
import { Gap, Message, Input } from '../../components/atoms/Atoms';
import { ClipLoader } from 'react-spinners/ClipLoader';
import axios from 'axios';

const Dashboard = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));

	console.log(mhsInfo);
	//  let { nim, fullName } = mhsInfo;

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
				`http://localhost:8910/api/student/upload/${mhsInfo?._id}`,
				{
					file,
				},
				config
			);

			console.log(user);
			console.log(file);
			// window.location.reload();
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}
	};

	return (
		<div>
			<Helmet>
				<title>Dashboard | Lapor MBKM</title>
			</Helmet>
			<div className="mb-1">
				<h2>Selamat datang!</h2>
				<p>Nim {mhsInfo?.nim}</p>
				<p>{mhsInfo?.fullName}</p>
			</div>

			<div className="mb-1">
				<h2 className="mb-1">Upload SK diterima Mitra</h2>

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
		</div>
	);
};

export default Dashboard;
