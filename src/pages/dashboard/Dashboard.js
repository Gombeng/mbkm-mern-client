import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Components';
import { Gap, Message, Input } from '../../components/atoms/Atoms';
import { ClipLoader } from 'react-spinners/ClipLoader';
import axios from 'axios';

const Dashboard = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	const skUploaded = localStorage.getItem('skAcc');

	// console.log(skUploaded.valueOf);
	//  let { nim, fullName } = mhsInfo;

	const [loading, setLoading] = useState(false);
	const [skAcc, setSkAcc] = useState(false);
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (skUploaded) setSkAcc(true);
	}, [skUploaded]);

	const handleSubmit = async (e) => {
		// e.preventDefault();

		let formData = new FormData();
		formData.append('skAcc', file);

		try {
			const config = {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			};

			setLoading(true);

			const user = await axios.patch(
				`http://localhost:8910/api/student/sk-mitra/${mhsInfo?._id}`,
				{
					file,
				},
				config
			);

			console.log(user.data);
			console.log(file.name);
			localStorage.setItem('skAcc', file.name);
			window.location.reload();
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
				<h3>Selamat datang!</h3>
				<p>Nim {mhsInfo?.nim}</p>
				<p>{mhsInfo?.fullName}</p>
			</div>

			{!skAcc ? (
				<div className="mb-1">
					<h3 className="mb-1">Upload SK diterima Mitra</h3>

					<form onSubmit={handleSubmit} encType="multipart/form-data">
						<Input
							className="border-none p-0"
							type="file"
							// accept=".png, .jpg, .jpeg"
							accept=".pdf"
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
				<Message className="mb-1 success">
					Surat keterangan diterima mitra sudah diupload
				</Message>
			)}
		</div>
	);
};

export default Dashboard;
