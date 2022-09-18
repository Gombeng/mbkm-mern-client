import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';
import styled from 'styled-components';
import { Button, FlexBox, Gap, Input, Message } from '../../components/Components';
import axios from 'axios';

let options = [
	{
		value: 'Analisis Desain Berorientasi Objek',
		label: 'Analisis Desain Berorientasi Objek',
	},
	{
		value: 'Pemrograman Website',
		label: 'Pemrograman Website',
	},
];

const IsiBorang = () => {

	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	console.log(mhsInfo)
	let {_id} = mhsInfo;
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
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

			const { data } = await axios.patch(
				`http://localhost:8910/api/student/update/${_id}`,
				{
					nameMk: selectedOption,
					borangMk: file,
				},
				config
			);

			if (!data) {
				setError('Something wrong!');
			}

			setLoading(false);
			console.log(data);
			localStorage.setItem('mhsInfo', JSON.stringify(data));
			setSuccess('Berhasil Upload SK');
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}
	};


	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<div>
				<FlexBox className="mb-1">
					<h2>Silahkan Upload borang MK yang akan dikonversi</h2>
				</FlexBox>

				<hr className="mb-1" />
					{error && <Message className="mb-1 error">{error}</Message>}
					{success && <Message className="mb-1 success">{success}</Message>}

				<form onSubmit={handleSubmit} encType='multipart/form-data'>

					<p className="mb-half">Mata Kuliah</p>
					<Select
						placeholder="Pilih Mata Kuliah"
						value={selectedOption}
						onChange={setSelectedOption}
						options={options}
					/>
					<Gap height={20} />

					<Input
						value={file}
						onChange={(e) => setFile(e.target.files[0])}
						label="Borang"
						type="file"
						className="p-1"
						placeholder="********"
					/>
					<Gap height={20} />

					<Button
						title={loading ? <ClipLoader size={20} /> : 'Upload Borang'}
						className="button mr-1"
						type="submit"
					/>
				</form>

				{/* <Outlet /> */}
			</div>
		</div>
	);
};

// const Container = styled.div`
// 	position: relative;

// 	&::after {
// 		content: '';
// 		position: absolute;
// 		width: 0.5rem;
// 		height: 0.5rem;
// 		top: 39%;
// 		border: 2px solid rgb(0, 0, 0);
// 		border-left: 0;
// 		border-bottom: 0;
// 		left: calc(100% - 2rem);
// 		/* left: 2rem; */
// 		transform: rotate(135deg);
// 	}
// `;

// const Select = styled.select`
// 	all: unset;
// 	background-color: transparent;
// 	border: 2px solid black;
// 	border-radius: 0.3rem;
// 	padding: 1rem 3rem 1rem 1rem;
// 	cursor: pointer;

// 	option {
// 		cursor: pointer;
// 	}
// `;

export default IsiBorang;
