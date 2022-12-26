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
import { Link } from 'react-router-dom';

const Logsheet = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	const [logsheet, setLogsheet] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listLogsheet, setListLogsheet] = useState([]);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const { data } = await axios.post(
				`http://localhost:8910/api/students/upload-logsheet/${mhsInfo?._id}`,
				{ logsheet },
				config
			);

			if (data) {
				console.log(data.logsheet);
				setLoading(false);
				setMessage('Logsheet berhasil diupload, Upload lagi besok!');
			}
			window.alert('Logsheet berhasil diupload, Upload lagi besok!');
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			setError(error.response.data.message);
		}
	};

	useEffect(() => {
		const fetchLogsheet = async () => {
			const { data } = await axios.get(
				`http://localhost:8910/api/students/${mhsInfo?._id}`,
				config
			);

			setListLogsheet(data.data.logsheet);
		};

		fetchLogsheet();
	}, []);

	let i = 1;
	return (
		<div>
			<Helmet>
				<title>Logsheet | Lapor MBKM</title>
			</Helmet>

			{message && <Message className="mb-1 success">{message}</Message>}
			<form onSubmit={() => handleSubmit()} className='mb-1'>
				<p className="mb-1">
					Silahkan upload logsheet ke Google drive dan input linknya disini
				</p>

				<div>
					<Input
						className="b-1 p-1"
						value={logsheet}
						onChange={(e) => setLogsheet(e.target.value)}
						label="Logsheet"
						type="url"
						placeholder="drive.google.com"
					/>
					<Gap height={20} />

					<Button
						title={loading ? <ClipLoader size={20} /> : 'Upload'}
						className="button mr-1"
						type="submit"
					/>
				</div>
			</form>

			<h4 className="mb-1">Tabel Logsheet / Logbook harian yang sudah di upload</h4>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						<th style={{ width: '' }}>Logsheet</th>
					</tr>
				</thead>
				<tbody>
					{!listLogsheet?.length ? (
						<tr>
							<td colSpan={2}>Data kosong</td>
						</tr>
					) : (
						listLogsheet?.map((data, j) => (
							<tr key={j}>
								<td>{i++}</td>
								<td><a href={data} target="_blank" rel='noreferrer'>{data}</a></td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default Logsheet;
