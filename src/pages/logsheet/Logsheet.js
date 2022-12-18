import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Button, Gap, Input, Message } from '../../components/Components';
import ClipLoader from 'react-spinners/ClipLoader';

const Logsheet = () => {
	const mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	const [logsheet, setLogsheet] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (e) => {
			try {
				const config = {
					headers: {
						'Content-type': 'application/json',
					},
				};

				setLoading(true);

				const { data } = await axios.post(
					`http://localhost:8910/api/students/upload-logsheet/${mhsInfo?._id}`,
					{ logsheet },
					config
				);

				if (data) {
					console.log(data.logsheet);
					setLoading(false);

					// Save current timestamp to localstorage
					localStorage.setItem(
						'submitted-date',
						JSON.stringify(new Date().getTime())
					);

					setMessage('Logsheet berhasil diupload, Upload lagi besok!');
				}
			} catch (error) {
				setLoading(false);
				console.log(error.response);
				setError(error.response.data.message);
			}
		},
		[logsheet, mhsInfo?._id]
	);

	useEffect(() => {
		const submittedDate = localStorage.getItem('submitted-date');
		const timestamp = new Date().getTime(); // Unix timestamp
		const timeDiff = Math.abs(submittedDate - timestamp); // Calculate difference between current timestamp and saved timestamp
		const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Get day from timestamp

		if (!submittedDate) {
			// Submit your form here because this is the first time or there is nothing in localstorage
			handleSubmit();
		}

		if (submittedDate && diffDays < 1) {
			setMessage('Logsheet berhasil diupload, Upload lagi besok!');
		}
	}, [handleSubmit]);

	return (
		<div>
			<Helmet>
				<title>Logsheet | Lapor MBKM</title>
			</Helmet>

			<div>
				<h3 className="mb-1">Silahkan Upload Logsheet harian</h3>

				<hr className="mb-1" />

				{message ? (
					<Message className="mb-1 success">{message}</Message>
				) : (
					<form onSubmit={handleSubmit}>
						{error && <Message className="mb-1 error">{error}</Message>}

						<p className="mb-1">
							Silahkan upload logsheet ke Google drive dan input linknya disini
						</p>

						<div>
							<Input
								className="b-1 p-1"
								value={logsheet}
								onChange={(e) => setLogsheet(e.target.value)}
								label="Logsheet"
								type="url"
								placeholder="drive.google.com"
							/>
							<Gap height={20} />

							<Button
								title={loading ? <ClipLoader size={20} /> : 'Upload'}
								className="button mr-1"
								type="submit"
								// disabled={disabled}
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default Logsheet;
