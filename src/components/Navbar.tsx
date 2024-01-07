'use client'
import { usePathname } from 'next/navigation';
import { NavigationMenuItem } from './ui/navigation-menu';
import Link from 'next/link';
import { Button } from './ui/button';
import { Clapperboard, Film, Popcorn, Tv } from 'lucide-react';
import { SheetClose } from './ui/sheet';
import React from 'react';

const SelectedStyle = 'text-rose-600 shadow-[0_0_30px_#e11d48]';

export default function Navbar() {
	const pathname = usePathname();

	const navbarLinks = [
		{
			id: 1,
			href: "/",
			label: (
				<Button variant="ghost" className='font-bold text-foreground backdrop-blur	' >
					<Popcorn className="mr-2 h-[1fr] w-[1fr] text-rose-600" /> Cinema-App
				</Button>),
		},
		{
			id: 2,
			href: "/movies",
			label: (<Button variant="ghost"><Film className={`mr-2 h-4 w-4 ${pathname === '/movies' && SelectedStyle}`} /> Фильмы</Button>)
		},
		{
			id: 3,
			href: "/serials",
			label: (<Button variant="ghost"><Clapperboard className={`mr-2 h-4 w-4 ${pathname === '/serials' && SelectedStyle}`} /> Сериалы</Button>)
		},
		{
			id: 4,
			href: "/tv-shows",
			label: (<Button variant="ghost"><Tv className={`mr-2 h-4 w-4 ${pathname === '/tv-shows' && SelectedStyle}`} /> ТВ-Шоу</Button>)
		}
	];

	return (
		<div className='flex'>
			{navbarLinks.map((item) => (
				<NavigationMenuItem key={item.id}>
					<Link href={item.href} className={`me-2 ${pathname !== item.href ? 'text-foreground/60' : ''}`}>
						{item.label}
					</Link>
				</NavigationMenuItem>
			))
			}
		</div >
	);
}

export const SheetNavbar = (props: any) => {
	const pathname = usePathname();

	const navbarSheetLinks = [
		{
			id: 1,
			href: "/movies",
			label: (<Button variant="ghost"><Film className={`mr-2 h-4 w-4 ${pathname === '/movies' && SelectedStyle}`} /> Фильмы</Button>)
		},
		{
			id: 2,
			href: "/serials",
			label: (<Button variant="ghost"><Clapperboard className={`mr-2 h-4 w-4 ${pathname === '/serials' && SelectedStyle}`} /> Сериалы</Button>)
		},
		{
			id: 3,
			href: "/tv-shows",
			label: (<Button variant="ghost"><Tv className={`mr-2 h-4 w-4 ${pathname === '/tv-shows' && SelectedStyle}`} /> ТВ-Шоу</Button>)
		}
	];

	const [SheetCloseWrapper, shetCloseWrapperProps] = props.withSheetClose
		? [SheetClose, { asChild: true }]
		: [React.Fragment, {}];
	return (
		<div className='flex flex-col font-medium mt-5'>
			{navbarSheetLinks.map((item) => (
				<SheetCloseWrapper {...shetCloseWrapperProps} key={item.id}>
					<Link key={item.id} href={item.href} className={`me-2 ${pathname !== item.href ? 'text-foreground/60' : ''}`}>
						{item.label}
					</Link>
				</SheetCloseWrapper>
			))}
		</div>
	);
};