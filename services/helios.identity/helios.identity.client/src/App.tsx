import { useEffect } from 'react';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';

// Components
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	// First thing we do on mount is check if the users login token is valid
	useEffect(() => {
		if (!token) navigate('/login');
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
