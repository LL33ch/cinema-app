"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from 'react-hot-toast'

export function ModeToggle() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => {
					setTheme("light")
					toast.success('Светлая тема выбрана', { position: 'top-center' });
				}}>
					Светлая
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => {
					setTheme("dark")
					toast.success('Тёмная тема выбрана', {
						position: 'top-center', style: {
							borderRadius: '10px',
							background: '#101013',
							color: '#fff',
						},
						iconTheme: {
							primary: '#61d345',
							secondary: '#101013',
						},
					});
				}}>
					Тёмная
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => {
					setTheme("system")
					toast.success('Системная тема выбрана', { position: 'top-center' });
				}}>
					Системная
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
