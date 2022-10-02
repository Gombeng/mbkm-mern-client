import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';

const IsiBorang = () => {
	let mhsInfo = JSON.parse(sessionStorage.getItem('mhsInfo'));

	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<div>
				<h2 className="mb-1">Silahkan Upload SK diterima mitra</h2>

				<hr className="mb-1" />
				<h1>Make it better la</h1>
			</div>
		</div>
	);
};

export default IsiBorang;
