import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button, Input } from '../../components/Components';
import { Logo } from '../../assets/Assets';

const Profil = () => {
	let mhsInfo = JSON.parse(sessionStorage.getItem('mhsInfo'));

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
						<img className="p-1" width={300} height={300} src={Logo} alt="" />
					</div>

					<Button title="Ganti Gambar" />
				</Container>

				<Container className="p-1">
					<div className="mb-1">
						<p>NIM</p>
						<h3 className="">{mhsInfo?.nim}</h3>
					</div>
					<div className="mb-1">
						<p>Nama Lengkap</p>
						<h3 className="">{mhsInfo?.fullName}</h3>
					</div>
					<div className="mb-1">
						<p>Email</p>
						<h3 className="">{mhsInfo?.email}</h3>
					</div>
				</Container>
			</Flexbox>
		</div>
	);
};

const Container = styled.div`
	/* flex: 1; */

	img {
		border-radius: 50%;
	}
`;
const Flexbox = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
`;

export default Profil;
