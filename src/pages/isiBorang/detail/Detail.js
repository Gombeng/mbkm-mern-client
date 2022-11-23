import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { Button, FlexBox } from '../../../components/Components';

const Detail = () => {
	const { idCpmk } = useParams();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [answer, setAnswer] = useState('');
	console.log(data);

	useEffect(() => {
		async function fetchMatkul() {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.get(
				`http://localhost:8910/api/admin/getAll/cpmk/${idCpmk}`,
				config
			);
			setData(data.data);
		}

		fetchMatkul();
	}, [idCpmk]);

	const submitHandler = async (e) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.patch(
				`http://localhost:8910/api/student/isi-borang/${idCpmk}`,
				{
					answer,
				},
				config
			);

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
				<h3 className="mb-1">Silahkan isi borang</h3>
			</FlexBox>
			<hr className="mb-1" />

			<form className="mb-1" onSubmit={submitHandler}>
				<p className="mb-1">
					{data.code} - {data.name}
				</p>

				<Textarea
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					rows="5"
					placeholder="Jawaban anda..."
				></Textarea>
				<div className="mb-1">
					<Button
						title={loading ? <ClipLoader size={20} /> : 'Simpan'}
						className="button mr-1 mb-1"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default Detail;

const Textarea = styled.textarea`
	padding: 0.8rem 1rem;
	border-radius: 0.3rem;
	resize: vertical;
	width: 100%;
`;
