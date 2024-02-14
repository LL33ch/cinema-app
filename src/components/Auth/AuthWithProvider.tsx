'use client'
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function AuthWithProvider() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false)
	const { setIsAuthenticated, setIsAccess } = useAuth();

	async function handleAuth() {
		setIsLoading(true)
		try {
			setTimeout(() => {
				setIsLoading(false)
			}, 5000)
			const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
			if (authData.record.access) {
				setIsAccess(true)
			}
			setIsAuthenticated(true);
			router.push('/')
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t"></span>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Другие способы входа</span>
				</div>
			</div>
			<Button type='button' variant='outline' className='w-full' onClick={() => handleAuth()} disabled={isLoading}><Image src="/google-logo.svg" height={17} width={17} alt='google-logo' className='me-2' />Google</Button>
		</>
	)
}