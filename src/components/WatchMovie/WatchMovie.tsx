"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link';
import { useMediaQuery } from '@/lib/hooks';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"

const formSchema = z.object({
	password: z.string().min(1).max(4),
})
interface WatchMovieIframeProps {
	IframeSrc?: string;
	kp_id?: number;
}

export function WatchMovieButton() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [accessValue, setAccessValue] = useState<string | null>(null);
	const isDesktop = useMediaQuery("(min-width: 768px)")

	useEffect(() => {
		const access = localStorage.getItem('access');
		setAccessValue(access);
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.password === '3120') {
			setErrorMessage(null);
			localStorage.setItem('access', 'true');
			window.location.reload();
		} else {
			setErrorMessage('Неверный пароль');
		}
	}

	if (!accessValue) {
		if (isDesktop) {
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button className="my-5">
							<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
						</Button>
					</DialogTrigger>
					<DialogContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Пароль</FormLabel>
											<FormControl>
												<Input type="password" placeholder="Введите пароль" {...field} />
											</FormControl>
											<FormMessage>{errorMessage}</FormMessage>
										</FormItem>
									)}
								/>
								<DrawerFooter>
									<Button type='submit'>Продолжить</Button>
									<DrawerClose asChild>
										<Button variant="outline">Cancel</Button>
									</DrawerClose>
								</DrawerFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			);
		} else {
			return (
				<Drawer>
					<DrawerTrigger>
						<Button className="my-5">
							<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
						</Button>
					</DrawerTrigger>
					<DrawerContent className='px-4 mb-2'>
						<DrawerHeader className="text-left px-0">
							<DrawerTitle>Введите пароль чтобы продолжить</DrawerTitle>
							<DrawerDescription>
								Во избежании блокировок, общедоступный просмотр фильмов недоступен.
							</DrawerDescription>
						</DrawerHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input type="password" placeholder="Введите пароль" {...field} />
											</FormControl>
											<FormMessage>{errorMessage}</FormMessage>
										</FormItem>
									)}
								/>
								<Button type="submit" className='w-full'>Продолжить</Button>
							</form>
						</Form>
					</DrawerContent>
				</Drawer>
			);
		}
	} else {
		return (
			<Link href="#iframe">
				<Button className="my-5">
					<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
				</Button>
			</Link>
		);
	};
}

export function WatchMovieIframe({ IframeSrc, kp_id }: WatchMovieIframeProps) {
	const [accessValue, setAccessValue] = useState<string | null>(null);

	useEffect(() => {
		const access = localStorage.getItem('access');
		setAccessValue(access);
	}, []);

	if (accessValue) {
		return (
			<>
				{/* <div className={`container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg`}>
					<iframe
						id="iframe"
						src={IframeSrc}
						width="100%"
						height="700px"
						allowFullScreen
					></iframe>
				</div> */}
				<div className={`container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg`}>
					<iframe
						id="iframe"
						src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${kp_id}`}
						width="100%"
						height="700px"
						allowFullScreen
					></iframe>
				</div>
			</>
		);
	}
};

export default WatchMovieButton;
