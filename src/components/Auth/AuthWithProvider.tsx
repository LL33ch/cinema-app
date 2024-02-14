import { Button } from '../ui/button';
import Image from 'next/image';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function AuthWithProvider() {

	async function handleAuth() {
		try {
			const authData = await pb.collection('users').authWithOAuth2({ provider: 'google', redirectUrl: 'https://cinema-app.pockethost.io/api/oauth2-redirect' });
		} catch (error) {

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
			<Button type='button' variant='outline' className='w-full' onClick={() => handleAuth()}><Image src="/google-logo.svg" height={17} width={17} alt='google-logo' className='me-2' />Google</Button>
		</>
	)
}