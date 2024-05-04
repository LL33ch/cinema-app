"use client"
import PocketBase from 'pocketbase';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner"
import { useAuth } from '@/components/Auth/AuthContext';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import AuthWithProvider from './AuthWithProvider';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const formSchema = z.object({
	username: z.string().min(4),
	email: z.string().email(),
	password: z.string().min(6),
	passwordConfirm: z.string()
})

export function RegisterForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		if (values.password !== values.passwordConfirm) {
			toast.error('Пароли не совпадают', {
				position: 'top-center',
			})
			setIsLoading(false)
			return
		}
		const data = {
			"username": values.username,
			"email": values.email,
			"password": values.password,
			"passwordConfirm": values.passwordConfirm,
		};
		try {
			const authData = await pb.collection('users').create(data);
			const TgBotMessage = `👤 Пользователь <b>${values.username}</b> (${values.email}) зарегистрировался.<blockquote>${navigator.userAgent}</blockquote>`
			await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT}&text=${TgBotMessage}&parse_mode=html`)
			toast.success('Успешная регистрация')
			router.push('/auth/login')
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'data' in error) {
				const err = error as { data: { data: { email?: { code: string }; username?: { code: string } } } };
				const emailErrorCode = err.data.data.email?.code;
				const usernameErrorCode = err.data.data.username?.code;

				let errorMessage = 'Ошибка регистрации';

				switch (emailErrorCode || usernameErrorCode) {
					case 'validation_invalid_email':
						errorMessage = 'Адрес электронной почты недействителен или уже используется.';
						break;
					case 'validation_invalid_username':
						errorMessage = 'Имя пользователя недействительно или уже используется.';
						break;
				}

				toast.error(errorMessage, {
					position: 'top-center',
				});
			} else {
				toast.error('Произошла неизвестная ошибка.' + error, {
					position: 'top-center',
				});
			}

			setIsLoading(false);
		}
	}

	return (
		<div className='sm:w-[350px] mx-auto'>
			<div className="flex flex-col space-y-2 text-center"><h1 className="text-2xl font-semibold tracking-tight">Создать аккаунт</h1></div>
			<div className='grid mt-5'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Логин' type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Почта' type='email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Пароль' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Подтвердите пароль' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid gap-3'>
							<span>Уже есть аккаунт? <Link href={'/auth/login'} className='hover:underline text-zinc-500 dark:text-zinc-300'>Войдите</Link></span>
							<Button type="submit" disabled={isLoading}>{isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)} {isLoading ? 'Загрузка' : 'Зарегистрироваться'}</Button>
						</div>
						<AuthWithProvider />
					</form>
				</Form>
			</div>
		</div>
	)
}
