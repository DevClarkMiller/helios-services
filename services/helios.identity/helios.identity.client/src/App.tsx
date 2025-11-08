import { useEffect } from 'react';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';
import { auth } from './api/login';

// Components
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const redirectUrl = searchParams.get('redirectUrl');

	// First thing we do on mount is check if the users login token is valid
	useEffect(() => {
		// First try auth
		(async () => {
			let resp = await auth();
			if (resp.data != null) {
				console.log(resp.data);
				return;
			}

			if (token != null) {
				localStorage.setItem('token', token as string);
				resp = await auth();
				//Validate token is correct, if so return
				if (resp.data != null) {
					console.log(resp.data);
					return;
				}
			} else {
				navigate('/login');
			}
		})();
	}, [token, navigate]);

	return (
		<Container fluid className="app-container bg-dark justify-content-between p-0">
			<Header />

			<div className="container p-2 m-0 d-flex flex-grow-1 justify-content-center items-align-center">
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Container>
	);
}

export default App;
