import React, { useContext, useEffect, useMemo, useState, type FormEvent } from 'react';
import { AccountContext } from '../../context/AccountContextProvider';
import { useNavigate } from 'react-router-dom';

interface FormData {
	email: string;
	password: string;
}

const IMPLEMENTED_METHODS = ['google'];

const useLogin = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

	const { isSignedIn } = useContext(AccountContext);

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

	useEffect(() => {
		if (isSignedIn) navigate('/');
	}, [isSignedIn, navigate]);

	return { formData, enabledLoginMethods, onChange, onSubmit };
};

export default useLogin;
