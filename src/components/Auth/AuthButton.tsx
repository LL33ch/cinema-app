'use client'
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, LogOut, Settings } from 'lucide-react';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function AuthButton() {
	const router = useRouter();
	const { isAuthenticated, setIsAuthenticated, setIsAccess } = useAuth();

	const handleClearAuth = () => {
		toast.warning(`Вы вышли из аккаунта ${pb.authStore.model?.username}`)
		setIsAuthenticated(false);
		setIsAccess(false);
		pb.authStore.clear()
		router.push('/')
	}

	useEffect(() => {
		setIsAuthenticated(pb.authStore.isValid);
	}, []);

	if (isAuthenticated === null) return null;

	if (isAuthenticated) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild><Button variant="outline" className='ms-2'>{pb.authStore.model?.username}</Button></DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => router.push('/bookmarks')}><Bookmark className="mr-2 h-4 w-4" />Закладки</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push('/settings')}><Settings className="mr-2 h-4 w-4" />Настройки</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleClearAuth()}><LogOut className="mr-2 h-4 w-4" />Выход</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	} else {
		return (
			<Link href="/auth/login"><Button className='ms-2'>Вход</Button></Link>
		);
	}
}
