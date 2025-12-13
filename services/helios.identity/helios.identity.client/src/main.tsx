import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import './styles/custom.scss';
import App from './App.tsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountContextProvider from './context/AccountContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AccountContextProvider>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</AccountContextProvider>
		</BrowserRouter>
	</StrictMode>
);
