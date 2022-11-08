import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, FlexBox } from './../../components/Components';
import styled from 'styled-components';
import axios from 'axios';

const IsiBorang = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));

	const [loading, setLoading] = useState(false);
	const [subject, setSubject] = useState('');
	const [data, setData] = useState('');
	const [cpmk, setCpmk] = useState('');

	// console.log(subject);

	useEffect(() => {
		(async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			// api for display all matkul
			const { data } = await axios.get(
				`http://localhost:8910/api/admin/getAll/cpmks`,
				config
			);

			// api for display matkul by id
			const { matkul } = await axios.get(
				`http://localhost:8910/api/admin/getAll/cpmks/${subject}`,
				config
			);

			console.log(matkul);

			// console.log(data.data);
			setData(data.data);

			// localStorage.setItem('subjectInfo', JSON.stringify(data));
		})();
	}, []);

	const submitHandler = async (e) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			// const { data } = await axios.post(
			// 	`http://localhost:8910/api/admin/input-rps/${subject}`,
			// 	{
			// 		_cpmks: cpmk,
			// 		name,
			// 	},
			// 	config
			// );

			console.log(data.data);

			// localStorage.setItem('adminInfo', JSON.stringify(data.data));
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
				<h2 className="mb-1">Silahkan Pilih Mata Kuliah</h2>
			</FlexBox>

			<hr className="mb-1" />

			<form className="mb-1" onSubmit={submitHandler}>
				<Select
					className="mb-1"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				>
					<option value="">-- Pilih Mata Kuliah --</option>
					{data.length > 0 &&
						data.map(({ _id, name }) => <option value={_id}>{name}</option>)}
				</Select>

				{data.length > 0 &&
					data.map(({ name, _cpmks }, index) => (
						<div key={index}>
							<h3>{name}</h3>

							{_cpmks.map(({ name, code }, index) => (
								<div>
									<p>{code}</p>
									<p>{name}</p>
									<Textarea
										value={cpmk}
										onChange={(e) => setCpmk(e.target.value)}
										rows="5"
										placeholder="Jawaban anda..."
									></Textarea>
								</div>
							))}
						</div>
					))}
			</form>
			<div className="mb-1">
				<Button
					title={loading ? <ClipLoader size={20} /> : 'Simpan'}
					className="button mr-1 mb-1"
					type="submit"
				/>
			</div>
		</div>
	);
};

export default IsiBorang;

const Select = styled.select`
	padding: 1rem;
	border-radius: 0.3rem;
	width: 100%;
`;

const Textarea = styled.textarea`
	padding: 0.8rem 1rem;
	border-radius: 0.3rem;
	resize: vertical;
	width: 100%;
`;
