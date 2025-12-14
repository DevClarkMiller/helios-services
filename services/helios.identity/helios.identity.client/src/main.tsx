import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import './styles/index.scss';
import './styles/custom.scss';
import App from './App.tsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountContextProvider from './context/AccountContextProvider.tsx';
import AppContextProvider from './context/AppContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AppContextProvider>
				<AccountContextProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</AccountContextProvider>
			</AppContextProvider>
		</BrowserRouter>
	</StrictMode>
);
