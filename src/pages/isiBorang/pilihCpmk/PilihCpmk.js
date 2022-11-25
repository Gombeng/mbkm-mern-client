import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Button, FlexBox, Input } from '../../../components/Components';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners/ClipLoader';

const PilihCpmk = () => {
	const { subject, idBorang } = useParams();
	const [data, setData] = useState('');
	const [loading, setLoading] = useState(false);
	const [answer, setAnswer] = useState('');
	const [code, setCode] = useState('');
	const [borang, setBorang] = useState('');

	console.log(borang);

	async function fetchMatkul() {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		const { data } = await axios.get(
			`http://localhost:8910/api/admin/getOne/subjects/${subject}`,
			config
		);
		setData(data.data);
	}

	async function fetchBorang() {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		const { data } = await axios.get(
			`http://localhost:8910/api/student/getAll/borangs/${idBorang}/answers`,
			config
		);
		setBorang(data);
	}

	useEffect(() => {
		fetchBorang();
		fetchMatkul();
	}, []);

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
				`http://localhost:8910/api/student/isi-cpmk/${idBorang}`,
				{
					name: code,
					answer,
				},
				config
			);

			console.log(data.data);
			setLoading(false);
			window.location.reload();
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			// setError(error.response.data.message);
		}
	};

	const deleteHandler = async (e) => {
		// e.preventDefault();
		setLoading(true);
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		let confirmBox = window.confirm('Hapus isian CPMK ini?');
		if (confirmBox) {
			await axios
				.delete(`http://localhost:8910/api/student/hapus-cpmk/${e}`, config)
				.then((data) => {
					console.log(data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		}
		window.location.reload();
	};

	let i = 1;
	let j = 1;

	// console.log(borang._answers);
	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>
			<FlexBox>
				<h3 className="mb-1">Silahkan pilih CPMK</h3>
			</FlexBox>
			<hr className="mb-1" />

			<h3 className="mb-1">{data.name}</h3>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '5rem' }}>No</th>
						<th style={{ width: '10rem' }}>Kode</th>
						<th style={{ width: '' }}>Deskripsi</th>
					</tr>
				</thead>
				<tbody>
					{data.length &&
						data[0]._cpmks?.map(({ _id, code, name }) => (
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
					className=" p-1"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					required
				>
					<option value="">-- Pilih Kode CPMK --</option>
					{data.length &&
						data[0]._cpmks?.map(({ _id, code, name }) => (
							<option key={_id} value={name}>
								{code}
							</option>
						))}
				</Select>

				<Input
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					className=" p-1 mb-1"
					placeholder="Jawaban anda..."
				/>

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Submit'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '5rem' }}>No</th>
						<th style={{ width: '10rem' }}>Deskripsi</th>
						<th style={{ width: '' }}>Jawaban Anda</th>
						<th style={{ width: '10rem' }}>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{borang?._answers?.map(({ _id, answer, name }) => (
						<tr key={_id}>
							<td>{j++}</td>
							<td>{name}</td>
							<td>{answer}</td>
							<td>
								{/* <p style={{ padding: '.3rem' }}>Edit</p> */}
								<DelButton onClick={() => deleteHandler(_id)}>Hapus</DelButton>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default PilihCpmk;

const DelButton = styled.button`
	all: unset;
	padding: 0.8rem 1rem;
	cursor: pointer;
	background-color: #d0a616;
	border-radius: 0.3rem;
`;

const Select = styled.select`
	cursor: pointer;
	width: 100%;
	outline: none;
	/* padding: 0.8rem 1rem; */
	border-radius: 0.3rem;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-size: 0.9em;
	font-family: sans-serif;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

	thead tr {
		background-color: #043175;
		color: #ffffff;
		text-align: left;
	}

	th,
	td {
		padding: 12px 15px;
	}

	tbody tr {
		border-bottom: 1px solid #dddddd;
	}

	tbody tr:nth-of-type(even) {
		background-color: #f3f3f3;
	}

	tbody tr:last-of-type {
		border-bottom: 2px solid #043175;
	}
`;
