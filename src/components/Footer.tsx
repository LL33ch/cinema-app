'use client'
import Link from 'next/link';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const currentYear = new Date().getFullYear();

export default function Footer() {

	const [accessValue, setAccessValue] = useState<string | null>(null);

	useEffect(() => {
		const access = localStorage.getItem('access');
		setAccessValue(access);
	}, []);

	return (
		<footer className="bg-white shadow dark:bg-zinc-900/70">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} Cinema-APP by MrR504. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<Link href="#" className="hover:underline me-4 md:me-6">About</Link>
					</li>
					<li>
						<Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
					</li>
					<li>
						<Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
					</li>
					<li>
						<Link href="#" className="hover:underline me-4 md:me-6">Contact</Link>
					</li>
					{accessValue ? (
						<li>
							<Button variant="destructive" size="icon" onClick={() => {
								localStorage.removeItem('access');
								window.location.reload();
							}}>
								<Trash2 className="h-4 w-4" />
							</Button>
						</li>
					) : <></>}
				</ul>
			</div>
		</footer>
	);
};