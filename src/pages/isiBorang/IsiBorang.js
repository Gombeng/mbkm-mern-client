import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, Table } from './../../components/Components';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IsiBorang = () => {
	const [cpmks, setCpmks] = useState('');
	const [subject, setSubject] = useState('');
	const [loading, setLoading] = useState(false);
	const [borangs, setBorangs] = useState('');
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));

	useEffect(() => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};
		const fetchCpmk = async () => {
			const { data } = await axios.get(
				`http://localhost:8910/api/admins/getAll/cpmks`,
				config
			);
			console.log('cpmks', data.data);
			setCpmks(data.data);
		};
		fetchCpmk();
		const fetchBorang = async () => {
			const { data } = await axios.get(
				`http://localhost:8910/api/students/student-borangs/${mhsInfo?._id}`,
				config
			);
			console.log('borang', data.data.idBorangs);
			setBorangs(data.data.idBorangs);
		};
		fetchBorang();
	}, [mhsInfo?._id]);

	const submitHandler = async (e) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				`http://localhost:8910/api/students/buat-borang/${mhsInfo?._id}`,
				{
					subject,
				},
				config
			);

			console.log(data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			// setError(error.response.data.message);
		}
	};

	let i = 1;
	let j = 1;
	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<p className="mb-1">
				Silahkan pilih mata kuliah yang akan dibuatkan borang
			</p>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						<th style={{ width: '10rem' }}>Kode</th>
						<th style={{ width: '' }}>Nama</th>
					</tr>
				</thead>
				<tbody>
					{!cpmks?.length ? (
						<tr>
							<td colSpan={3}>
								Mata Kuliah belum diinput oleh Dosen, mohon bersabar ini ujian.
							</td>
						</tr>
					) : (
						cpmks?.map(({ _id, code, name }) => (
							<tr key={_id}>
								<td>{j++}</td>
								<td>{code}</td>
								<td>{name}</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			{!cpmks?.length ? (
				''
			) : (
				<form className="mb-1" onSubmit={submitHandler}>
					<Select
						className="mb-1 p-1"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
					>
						<option value="">-- Pilih Matkul --</option>
						{cpmks?.length &&
							cpmks?.map(({ _id, name }) => (
								<option key={_id} value={name}>
									{name}
								</option>
							))}
					</Select>

					<Button
						title={loading ? <ClipLoader size={20} /> : 'Submit'}
						className="button mr-1"
						type="submit"
					/>
				</form>
			)}

			{!borangs?.length ? (
				''
			) : (
				<>
					<p className="mb-1">
						Setelah borang dibuat, silahkan klik detail untuk mengisi jawaban
						RPS
					</p>
					<Table className="mb-1">
						<thead>
							<tr>
								<th style={{ width: '3rem' }}>No</th>
								<th style={{ width: '' }}>Nama</th>
								<th style={{ width: '8rem' }}>Status Dosen</th>
								<th style={{ width: '12rem' }}>Status Ketua Jurusan</th>
								<th style={{ width: '5rem' }}>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{!borangs?.length ? (
								<tr>
									<td colSpan={3}>Data kosong</td>
								</tr>
							) : (
								borangs?.map(({ _id, subject, status }) => (
									<tr key={_id}>
										<td>{i++}</td>
										<td>{subject}</td>
										<td>{status}</td>
										<td>{status}</td>
										<td>
											<Link
												key={_id}
												style={{ color: 'black', textDecoration: 'none' }}
												to={`/isi-borang/${subject}/${_id}`}
											>
												<p
													style={{
														padding: '.8rem 1rem',
														backgroundColor: '#d0a616',
														borderRadius: '.3rem',
														width: 'fit-content',
													}}
												>
													Detail
												</p>
											</Link>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				</>
			)}
		</div>
	);
};

export default IsiBorang;

const Select = styled.select`
	cursor: pointer;
	width: 100%;
	outline: none;
	border-radius: 0.3rem;
`;
