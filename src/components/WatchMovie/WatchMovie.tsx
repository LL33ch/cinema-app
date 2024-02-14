"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
import PocketBase from 'pocketbase';
import { toast } from 'sonner';
import { useAuth } from '../Auth/AuthContext';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

interface WatchMovieIframeProps {
	IframeSrc?: string;
	kp_id?: number;
}

export function WatchMovieButton() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { isAccess } = useAuth();

	if (!isAccess) {
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
							<DialogTitle>Просмотр фильмов недоступен</DialogTitle>
							<DialogDescription>
								Во избежании блокировок, общедоступный просмотр фильмов недоступен. Обратитесь к администратору.
							</DialogDescription>
						</DialogHeader>
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
							<DrawerTitle>Просмотр фильмов недоступен</DrawerTitle>
							<DrawerDescription>
								Во избежании блокировок, общедоступный просмотр фильмов недоступен. Обратитесь к администратору.
							</DrawerDescription>
						</DrawerHeader>
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
	const { isAccess } = useAuth();
	const [player, selectPlayer] = useState<string>('HDVB');

	if (isAccess) {
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
