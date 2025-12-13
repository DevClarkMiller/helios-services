import React, { useMemo, useState, type FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginGoogle } from '../../services/Identity';

// Icons
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';

interface FormData {
	email: string;
	password: string;
}

const IMPLEMENTED_METHODS = ['google'];

const Login = () => {
	const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

	const enabledLoginMethods = useMemo(() => {
		const methods = {
			google: true,
			microsoft: true,
			helios: true,
		};

		Object.keys(methods).forEach(method => {
			if (!IMPLEMENTED_METHODS.includes(method)) (methods as Record<string, boolean>)[method] = false;
		});

		return methods;
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (e && e.preventDefault) e.preventDefault();

		alert(`Email: ${formData?.email}, Password: ${formData?.password}`);
	};

	return (
		<div className="w-100 d-flex flex-column align-items-center pt-5">
			<div className="text-center w-100 mb-4 text-primary">
				<h2>Login</h2>
				{/* TODO: STORE TOKEN TO CHANGE MESSAGE CONDITIONALLY HERE */}
				<h3>Glad to have you back</h3>
			</div>

			<div className="w-100 h-75 d-flex align-items-center justify-content-center flex-grow">
				<div className="card p-2 w-75 bg-secondary shadow" style={{ maxWidth: '352px' }}>
					<div className="card-body">
						<div className="d-flex justify-content-center gap-1 mb-3">
							<button
								disabled={!enabledLoginMethods.google}
								onClick={loginGoogle}
								className="btn btn-info w-100 btn-icon p-2">
								<FaGoogle className="text-white" />
							</button>
							<button
								disabled={!enabledLoginMethods.microsoft}
								className="btn btn-info w-100 btn-icon p-2">
								<FaMicrosoft className="text-white" />
							</button>
						</div>

						<form onSubmit={onSubmit}>
							<div className="d-flex flex-column gap-2">
								<Form.Group className="fw-semibold">
									<Form.Label hidden>Email Address</Form.Label>
									<Form.Control
										className="bg-primary"
										type="email"
										placeholder="Enter email"
										value={formData?.email}
										name="email"
										required
										disabled={!enabledLoginMethods.helios}
										onChange={onChange}></Form.Control>
								</Form.Group>

								<Form.Group className="fw-semibold">
									<Form.Label hidden>Password</Form.Label>
									<Form.Control
										className="bg-primary"
										type="password"
										placeholder="Enter password"
										value={formData?.password}
										name="password"
										required
										disabled={!enabledLoginMethods.helios}
										onChange={onChange}></Form.Control>
								</Form.Group>
							</div>

							<button
								disabled={!enabledLoginMethods.helios}
								className="btn btn-primary w-100 mt-3 text-light fw-bold"
								type="submit">
								Login
							</button>
						</form>
					</div>

					{enabledLoginMethods.helios && (
						<Link className="p-3 pt-1 text-decoration-none text-light" to="/createAccount">
							Don't have an account? Sign up
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
