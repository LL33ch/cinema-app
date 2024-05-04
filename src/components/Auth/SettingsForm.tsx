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
import { useEffect, useState } from 'react';
import { toast } from "sonner"
import { useAuth } from '@/components/Auth/AuthContext';
import { Loader2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const formSchema = z.object({
	username: z.string().min(4),
}).partial();

export function SettingsForm() {
	const router = useRouter();
	const { setUserData } = useAuth();
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingPage, setIsLoadingPage] = useState(true)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	useEffect(() => {
		if (!pb.authStore.isValid) {
			router.push('/');
		} else {
			setIsLoadingPage(false);
		}
	}, [router]);

	if (isLoadingPage) {
		return null;
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			username: values.username,
		}
		setIsLoading(true)
		if (pb.authStore.model?.username == values.username) {
			toast.error('Укажите новый логин', {
				position: 'top-center',
			})
			setIsLoading(false)
			return
		}
		try {
			const updateUser = await pb.collection('users').update(pb.authStore.model?.id, data);
			toast.success('Успешно')
			setUserData(updateUser.username);
			setIsLoading(false);
			router.push('/settings')
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'data' in error) {
				const err = error as { data: { data: { username?: { code: string } } } };
				const usernameErrorCode = err.data.data.username?.code;

				let errorMessage = 'Ошибка: ' + error;

				switch (usernameErrorCode) {
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
		<div className='sm:w-[500px] mx-auto'>
			<h1 className="text-2xl font-semibold">Настройки пользователя {pb.authStore.model?.username}</h1>
			<div className='grid mt-3 bg'>
				<Card>
					<CardHeader>
						<CardTitle className='text-xl'>Изменить логин</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									name="email"
									defaultValue={pb.authStore.model?.email}
									disabled
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder='Почта' type='text' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="username"
									defaultValue={pb.authStore.model?.username}
									render={({ field }) => (
										<div className="flex justify-between w-full items-center space-x-2">
											<FormItem className='w-full'>
												<FormControl>
													<Input placeholder='Логин' type='text' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
											<Button type="submit" disabled={isLoading}>{isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)} {isLoading ? 'Загрузка' : 'Сохранить'}</Button>
										</div>
									)}
								/>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
