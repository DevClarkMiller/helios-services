import { useState, type FormEvent } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Icons
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

interface FormData {
	email: string;
	password: string;
}

const Login = () => {
	const [formData, setFormData] = useState<FormData>({ email: "", password: "" });

	const onChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (e && e.preventDefault) e.preventDefault();

		alert(`Email: ${formData?.email}, Password: ${formData?.password}`);
	};

	return (
		<div>
			<div className="text-center w-100 mb-4">
				<h1>Login</h1>
				{/* TODO: STORE TOKEN TO CHANGE MESSAGE CONDITIONALLY HERE */}
				<h3>Glad to have you back</h3> 
			</div>

			<div className="card p-2">
				<div className="card-body">
					<div className="d-flex justify-content-center gap-1 mb-3">
						<div className="btn btn-info w-100 btn-icon p-2"><FaGoogle className="text-white"/></div>
						<div className="btn btn-info w-100 btn-icon p-2"><FaMicrosoft className="text-white"/></div>
					</div>

					<form onSubmit={onSubmit}>
						<div className="d-flex flex-column gap-2">
							<Form.Group className="fw-semibold">
								<Form.Label hidden>Email Address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									value={formData?.email}
									name="email"
									required
									onChange={onChange}
								>
								</Form.Control>
							</Form.Group>

							<Form.Group className="fw-semibold">
								<Form.Label hidden>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									value={formData?.password}
									name="password"
									required
									onChange={onChange}
								>
								</Form.Control>
							</Form.Group>
						</div>

						<button className="btn btn-primary w-100 mt-3" type="submit">Login</button>
					</form>
				</div>

				<Link className="p-3 pt-1 text-decoration-none" to='/createAccount'>Don't have an account? Sign up</Link>

			</div>
		</div>
  	);
}

export default Login;
