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

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const formSchema = z.object({
	login: z.string().min(3),
	password: z.string().min(6)
})

export function AuthForm() {
	const router = useRouter();
	const { setIsAuthenticated, setIsAccess } = useAuth();
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			const authData = await pb.collection('users').authWithPassword(values.login, values.password);
			if (authData.record.access) {
				setIsAccess(true)
			}
			toast.success('Успешная авторизация.')
			setIsAuthenticated(true);
			router.push('/')
		} catch (error) {
			toast.error('Произошла ошибка при авторизации', {
				position: 'top-center',
			})
			setIsLoading(false)
		}
	}

	return (
		<div className='sm:w-[350px] mx-auto'>
			<div className="flex flex-col space-y-2 text-center"><h1 className="text-2xl font-semibold tracking-tight">Вход в аккаунт</h1></div>
			<div className='grid mt-5'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="login"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Логин или почта</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid gap-3'>
							<span>Нет аккаунт? <Link href={'/register'} className='hover:underline text-zinc-300'>Зарегистрируйтесь</Link></span>
							<Button type="submit" disabled={isLoading}>{isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)} {isLoading ? 'Загрузка' : 'Вход'}</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
