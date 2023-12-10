"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link';

const formSchema = z.object({
	password: z.string().min(1).max(4),
})
const accessValue = localStorage.getItem('access');

interface WatchMovieIframeProps {
	MovieId: number;
}

export function WatchMovieButton({ MovieId }: WatchMovieIframeProps) {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button className="my-5">
						<MonitorPlay className="mr-2 h-4 w-4" />Смотреть
					</Button>
				</DialogTrigger>
				<DialogContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
							<Button type="submit">Продолжить</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		);
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

export function WatchMovieIframe({ MovieId }: WatchMovieIframeProps) {
	if (accessValue) {
		return (
			<div className={`container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg`}>
				<iframe
					id="iframe"
					src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${MovieId}`}
					width="100%"
					height="700px"
					allowFullScreen
				></iframe>
			</div>
		);
	}
};

export default WatchMovieButton;
