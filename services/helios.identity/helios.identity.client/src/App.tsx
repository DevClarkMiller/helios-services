import { useCallback, useEffect } from 'react';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';
import { auth } from './services/Identity/Auth';

// Components
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const redirectUrl = searchParams.get('redirectUrl');

	const redirectIfAuth = useCallback(async () => {
		let resp = await auth();
		const authSuccess = resp.data != null;

		if (!authSuccess) return;

		if (!redirectUrl) return;

		const token = localStorage.getItem('token') as string;

		const url = new URL(redirectUrl);
		url.searchParams.append('token', token);
		window.location.href = url.toString();
	}, [redirectUrl]);

	const login = useCallback(async () => {
		await redirectIfAuth();

		if (token != null) {
			localStorage.setItem('token', token as string);
			await redirectIfAuth();
		} else {
			navigate({ pathname: '/login', search: searchParams.toString() });
		}
	}, [redirectIfAuth, token, navigate, searchParams]);

	// First thing we do on mount is check if the users login token is valid
	// First try auth
	useEffect(() => {
		login();
	}, [login]);

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
