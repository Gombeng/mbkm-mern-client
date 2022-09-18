import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button, Input } from '../../components/Components';

const Profil = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	console.log(mhsInfo)
	let {nim, fullName, email} = mhsInfo;
	
	return (
		<div>
			<Helmet>
				<title>Profil | Lapor MBKM</title>
			</Helmet>
			
			<h2 className="mb-1">Profil</h2>
			<hr className="mb-1" />

			<Flexbox>
				<Container className="p-1">
					<div className="mb-1">
						<p>Gambar Profil</p>
						<strong>{nim}</strong>
					</div>
					<div className="mb-1">
						<p>NIM</p>
						<h3 className='m-1'>{nim}</h3>
					</div>
					<div className="mb-1">
						<p>Nama Lengkap</p>
						<h3 className='m-1'>{fullName}</h3>
					</div>
					<div className="mb-1">
						<p>Email</p>
						<h3 className='m-1'>{email}</h3>
					</div>
				</Container>
			</Flexbox>
		</div>
	);
};

const Container = styled.div`
	flex: 1;
`;
const Flexbox = styled.div`
	display: flex;
`;

export default Profil;
