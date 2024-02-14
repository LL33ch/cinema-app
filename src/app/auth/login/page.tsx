'use client'
import PocketBase from 'pocketbase';
import { LoginForm } from '@/components/Auth/LoginForm';
import { useRouter } from 'next/navigation'; // <-- Make sure this import is correct
import { useEffect, useState } from 'react';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function AuthPage() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (pb.authStore.isValid) {
			router.push('/');
		} else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return null;
	}

	return <LoginForm />;
}