import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Components';
import { Gap, Message, Input } from '../../components/atoms/Atoms';
import { ClipLoader } from 'react-spinners/ClipLoader';
import axios from 'axios';

const Dashboard = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	const skUploaded = localStorage.getItem('skAcc');
	const [loading, setLoading] = useState(false);
	const [skAcc, setSkAcc] = useState(false);
	const [skAccUploaded, setSkAccUploaded] = useState('')
	const [data, setData] = useState('')

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	useEffect(() => {
		if (skUploaded) setSkAccUploaded(true);
		
		const fetchData = async () => {
			const { data } = await axios.get(
				`http://localhost:8910/api/students/${mhsInfo?._id}`,
				config
			);

			setData(data.data.laporanAkhir);
		};

		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		try {

			setLoading(true);

			const data = await axios.post(
				`http://localhost:8910/api/students/sk-mitra/${mhsInfo?._id}`,
				{
					skAcc,
				},
				config
			);

			if (data) {
				console.log(data.logsheet);
				setLoading(false);
			}

			window.alert('Surat Keterangan Diterima Mitra berhasil diupload!');
			
			localStorage.setItem('skAcc', data);
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

			{!skAccUploaded ? (
				<div className="mb-1">
					<h3 className="mb-1">Upload SK diterima Mitra</h3>

					<form onSubmit={() => handleSubmit()}>
						<p className="mb-1">
							Silahkan upload logsheet ke Google drive dan input linknya disini
						</p>

						<Input
							className="b-1 p-1"
							value={skAcc}
							onChange={(e) => setSkAcc(e.target.value)}
							label="Surat Keterangan"
							type="url"
							placeholder="drive.google.com"
						/>
						<Gap height={20} />

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
					<a href={data} target='_blank' rel='noreferrer'> Lihat File</a>
				</Message>
			)}
		</div>
	);
};

export default Dashboard;
