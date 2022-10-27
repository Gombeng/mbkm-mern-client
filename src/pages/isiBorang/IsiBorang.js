import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, FlexBox } from './../../components/Components';
import styled from 'styled-components';

const options = [
	{ label: 'Pemrograman Website', value: 'pemweb' },
	{ label: 'Analisis Desain Berorientasi Objek', value: 'adbo' },
	{ label: 'Jaringan Komputer', value: 'jarkom' },
];

const subjects = [
	{
		id: 1,
		name: 'Perancangan dan Analisis Algoritma',
		code: 'INF11011',
		cpl: [
			{
				id: 1,
				code: 'S8',
				name: 'Menunjukkan sikap bertanggungjawab atas pekerjaan di bidang keahliannya secara mandiri',
			},
			{
				id: 2,
				code: 'S11',
				name: 'Memiliki Tekad/Kesungguhan dalam mencapai hasil yang maksimal',
			},
			{
				id: 3,
				code: 'KU1',
				name: 'Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi yang memperhatikan dan menerapkan nilai humaniora yang sesuai dengan bidang keahliannya',
			},
		],
	},
	{
		id: 2,
		name: 'Pemrograman Website',
		code: 'INF11011',
		cpl: [
			{
				id: 1,
				code: 'S8',
				name: 'Menunjukkan sikap bertanggungjawab atas pekerjaan di bidang keahliannya secara mandiri',
			},
			{
				id: 2,
				code: 'S11',
				name: 'Memiliki Tekad/Kesungguhan dalam mencapai hasil yang maksimal',
			},
			{
				id: 3,
				code: 'KU1',
				name: 'Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi yang memperhatikan dan menerapkan nilai humaniora yang sesuai dengan bidang keahliannya',
			},
		],
	},
];

const IsiBorang = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));

	const [loading, setLoading] = useState(false);

	// todo: get api berupa nama mk, lalu ditampilkan dalam bentuk option

	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<FlexBox>
				<h2 className="mb-1">Silahkan Pilih Mata Kuliah</h2>

				<div className="select-container">
					<Select>
						{options.map((option) => (
							<option value={option.value}>{option.label}</option>
						))}
					</Select>
				</div>
			</FlexBox>

			<hr className="mb-1" />

			{/* // todo: buat form macam di desain figma */}

			<form action="" className="mb-1">
				{subjects.map(({ name, cpl }, index) => (
					<div key={index}>
						<h3>{name}</h3>

						{cpl.map(({ name, code }, index) => (
							<div className="mb-1">
								<strong>Kode CPL - {code}</strong>
								<p>{name}</p>
								<Textarea
									style={{ width: '100%' }}
									rows="5"
									placeholder="Jawaban Anda..."
								></Textarea>
							</div>
						))}
					</div>
				))}
			</form>
			<div>
				<Button
					title={loading ? <ClipLoader size={20} /> : 'Masuk'}
					className="button mr-1"
					type="submit"
				/>
			</div>
		</div>
	);
};

export default IsiBorang;

const Select = styled.select`
	padding: 0.8rem 1rem;
	border-radius: 0.3rem;
`;

const Textarea = styled.textarea`
	padding: 0.8rem 1rem;
	border-radius: 0.3rem;
	resize: vertical;
`;
