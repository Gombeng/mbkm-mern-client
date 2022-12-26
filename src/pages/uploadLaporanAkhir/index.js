import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {
	Button,
	Gap,
	Input,
	Message,
	Table,
} from '../../components/Components';
import ClipLoader from 'react-spinners/ClipLoader';

const LaporanAkhir = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	const [laporanAkhir, setLaporanAkhir] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	console.log(data);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const handleSubmit = async (e) => {
		// e.preventDefault()
		try {
			setLoading(true);

			const { data } = await axios.post(
				`http://localhost:8910/api/students/upload-laporan-akhir/${mhsInfo?._id}`,
				{ laporanAkhir },
				config
			);

			if (data) {
				console.log(data.laporanAkhir);
				setLoading(false);
				setMessage('Laporan Akhir berhasil diupload!');
			}
			window.alert('Laporan Akhir berhasil diupload!!');
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			setError(error.response.data.message);
		}
	};

	useEffect(() => {
		const fetchLaporanAkhir = async () => {
			const { data } = await axios.get(
				`http://localhost:8910/api/students/${mhsInfo?._id}`,
				config
			);

			setData(data.data.laporanAkhir);
		};

		fetchLaporanAkhir();
	}, []);

	return (
		<div>
			<Helmet>
				<title>Laporan Akhir | Lapor MBKM</title>
			</Helmet>

			{message && <Message className="mb-1 success">{message}</Message>}
			<form onSubmit={() => handleSubmit()}>
				<p className="mb-1">
					Silahkan upload Laporan Akhir ke Google drive dan input linknya disini
				</p>

				<Input
					className="b-1 p-1"
					value={laporanAkhir}
					onChange={(e) => setLaporanAkhir(e.target.value)}
					label="Laporan Akhir"
					type="url"
					placeholder="drive.google.com"
				/>
				<Gap height={20} />

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Upload'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<h4 className="mb-1 mt-1">
				Tabel Laporan Akhir yang sudah di upload
			</h4>

			<Table className="mb-1 ">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						<th style={{ width: '' }}>Laporan Akhir</th>
					</tr>
				</thead>
				<tbody>
					{!data?.length ? (
						<tr>
							<td colSpan={2}>Data kosong</td>
						</tr>
					) : (
						<tr>
							<td>1</td>
							<td>
								<a href={data} target="_blank" rel="noreferrer">
									{data}
								</a>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default LaporanAkhir;
