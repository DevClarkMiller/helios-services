import { useEffect } from 'react';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';

// Components
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';

// Styles 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
  	const token = searchParams.get("token");

	// First thing we do on mount is check if the users login token is valid
	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, []);

  	return (
		<Container fluid className='app-container'>
			<Routes>
				<Route path='/login' element={<Login />} />
			</Routes>	
		</Container>
	)
}

export default App;
