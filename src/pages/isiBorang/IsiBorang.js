import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, FlexBox, Table } from './../../components/Components';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IsiBorang = () => {
	let i = 1;
	const [data, setData] = useState('');
	const [subject, setSubject] = useState('');
	const [loading, setLoading] = useState(false);
	const [borangs, setBorangs] = useState('');
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));

	// console.log(borangs);

	useEffect(() => {
		(async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			// api for display all subject
			const { data } = await axios.get(
				`http://localhost:8910/api/admin/getAll/cpmks`,
				config
			);

			setData(data.data);

			const borangs = await axios.get(
				`http://localhost:8910/api/student/getOne/student-borangs/${mhsInfo?._id}`,
				config
			);

			setBorangs(borangs.data._borangs);
		})();
	}, [mhsInfo]);

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
				`http://localhost:8910/api/student/buat-borang/${mhsInfo?._id}`,
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

	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<FlexBox>
				<h3 className="mb-1">Silahkan Pilih Mata Kuliah</h3>
			</FlexBox>

			<hr className="mb-1" />

			<p className="mb-1">
				Silahkan pilih mata kuliah yang akan dibuatkan borang
			</p>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '5rem' }}>No</th>
						<th style={{ width: '10rem' }}>Kode</th>
						<th style={{ width: '' }}>Nama</th>
					</tr>
				</thead>
				<tbody>
					{data.length &&
						data?.map(({ _id, code, name }) => (
							<tr key={_id}>
								<td>{i++}</td>
								<td>{code}</td>
								<td>{name}</td>
							</tr>
						))}
				</tbody>
			</Table>

			<form className="mb-1" onSubmit={submitHandler}>
				<Select
					className="mb-1 p-1"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
				>
					<option value="">-- Pilih Matkul --</option>
					{data.length &&
						data?.map(({ _id, name }) => (
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

			<p className="mb-1">Silahkan pilih borang untuk diisi cpmk</p>

			<Container>
				{borangs.length &&
					borangs?.map(({ _id, subject }) => (
						<Link
							className="card"
							key={_id}
							to={`/isi-borang/${subject}/${_id}`}
						>
							<p>{subject}</p>
						</Link>
					))}
			</Container>
		</div>
	);
};

export default IsiBorang;

const Select = styled.select`
	cursor: pointer;
	width: 100%;
	outline: none;
	/* padding: 0.8rem 1rem; */
	border-radius: 0.3rem;
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;

	.card {
		background-color: #7777ff;
		padding: 1rem;
		border-radius: 0.3rem;
		text-decoration: none;
		color: black;
	}
`;
