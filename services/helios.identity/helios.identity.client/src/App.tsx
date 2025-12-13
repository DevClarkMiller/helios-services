import { Route, Routes } from 'react-router-dom';

// Components
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { Bars } from 'react-loading-icons';
import { useContext } from 'react';
import { AccountContext } from './context/AccountContextProvider';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
	const { isAuthLoading } = useContext(AccountContext);

	return (
		<Container fluid className="app-container vh-100 bg-dark justify-content-between p-0">
			<Header />

			<div className="w-100 h-100 m-0 d-flex flex-grow-1 justify-content-center align-items-center">
				{!isAuthLoading ? (
					<Routes>
						<Route path="/*" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				) : (
					<Bars />
				)}
			</div>
		</Container>
	);
}

export default App;
