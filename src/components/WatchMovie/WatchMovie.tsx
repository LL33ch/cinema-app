"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
} from "@/components/ui/drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import Script from 'next/script';

const formSchema = z.object({
	password: z.string().min(1).max(4),
})
interface WatchMovieIframeProps {
	IframeSrc?: string;
	kp_id?: number;
}

export function WatchMovieButton() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [access, setAccess] = useState<string | null>(null);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		const getAcess = localStorage.getItem('access');
		if (getAcess === 'true') {
			setAccess(getAcess);
		}
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.password === '3120') {
			setErrorMessage(null);
			localStorage.setItem('access', 'true');
			setAccess('true');
			window.location.reload();
		} else {
			setErrorMessage('Неверный пароль');
		}
	}

	if (!access) {
		if (isDesktop) {
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button className="my-5">
							<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Введите пароль чтобы продолжить</DialogTitle>
							<DialogDescription>
								Во избежании блокировок, общедоступный просмотр фильмов недоступен.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">
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
								<Button type='submit'>Продолжить</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			);
		} else {
			return (
				<Drawer>
					<DrawerTrigger asChild>
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
								<DrawerFooter className='px-0'>
									<Button type='submit'>Продолжить</Button>
									<DrawerClose asChild>
										<Button variant="outline">Отмена</Button>
									</DrawerClose>
								</DrawerFooter>
							</form>
						</Form>
					</DrawerContent>
				</Drawer>
			);
		};
	} else {
		return (
			<Link href="#iframe">
				<Button className="my-5">
					<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
				</Button>
			</Link>
		);
	};
};

export function WatchMovieIframe({ IframeSrc, kp_id }: WatchMovieIframeProps) {
	const [accessValue, setAccessValue] = useState<string | null>(null);
	const [player, selectPlayer] = useState<string>('HDVB');

	useEffect(() => {
		const access = localStorage.getItem('access');
		setAccessValue(access);
	}, []);

	useEffect(() => {
	}, [player]);

	if (accessValue) {
		return (
			<div id="iframe" className={`container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg`}>
				<Select onValueChange={selectPlayer}>
					<SelectTrigger className="w-[180px] mb-2">
						<SelectValue placeholder="Выберите плеер" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="HDVB" defaultValue="HDVB">
							HDVB
						</SelectItem>
						<SelectItem value="VideoCDN">
							VideoCDN
						</SelectItem>
						<SelectItem value="KinoBD">
							KinoBD
						</SelectItem>
					</SelectContent>
				</Select>
				{(player === 'HDVB') &&
					<iframe
						id="iframeHDVB"
						src={IframeSrc}
						width="100%"
						height="700px"
						allowFullScreen
					></iframe>
				}
				{(player === 'VideoCDN') &&
					<iframe
						id="iframeVideCDN"
						src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${kp_id}`}
						width="100%"
						height="700px"
						allowFullScreen
					></iframe>
				}
				{(player === 'KinoBD') &&
					<div>
						<div data-kinopoisk={kp_id} id="kinobd"></div>
						<Script src="https://kinobd.net/js/player_.js" strategy="lazyOnload" />
					</div>
				}
			</div>
		);
	}

	return null;
};

export default WatchMovieButton;
