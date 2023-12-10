import type { Metadata } from 'next'
import Link from "next/link"
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'
import { AlignJustify, Film, Github, Home, Tv } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import SearchMovie from '@/components/SearchMovies/SearchMovies'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Cinema Next App by MrRobot (MrR504)',
  description: 'cinema-next-app',
}

const navbarLinks = [
  {
    id: 1,
    href: "/",
    label: (
      <Button variant="ghost" className='font-bold' >
        <Film className="mr-2 h-[1fr] w-[1fr]" /> Cinema-App
      </Button>),
  },
  {
    id: 2,
    href: "/movies",
    label: (<Button variant="link"><Film className="text-zinc-600 dark:text-current mr-2 h-4 w-4" /> Фильмы</Button>)
  },
  {
    id: 3,
    href: "/serials",
    label: (<Button variant="link"><Tv className="text-zinc-600	dark:text-current mr-2 h-4 w-4" /> Сериалы</Button>)
  },
  {
    id: 4,
    href: "/tv-shows",
    label: (<Button variant="link"><Tv className="text-zinc-600	dark:text-current mr-2 h-4 w-4" /> ТВ-Шоу</Button>)
  },
  {
    id: 5,
    href: "https://github.com/MrR504/cinema-app",
    label: (<Button variant="link"><Github className="text-zinc-600	dark:text-current mr-2 h-4 w-4" /> Github</Button>),
    target: "_blank"
  }
];

const currentYear = new Date().getFullYear();

const SheetNavbar = (props: any) => {
  const [SheetCloseWrapper, shetCloseWrapperProps] = props.withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  return (
    <div className='flex flex-col font-medium mt-5'>
      {navbarLinks.slice(1).map((item) => (
        <SheetCloseWrapper {...shetCloseWrapperProps} key={item.id}>
          <Link key={item.id} href={item.href}>
            {item.label}
          </Link>
        </SheetCloseWrapper>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <div className='flex'>
      {navbarLinks.map((item) => (
        <NavigationMenuItem key={item.id}>
          <Link href={item.href} target={item.target} className='pe-2'>
            {item.label}
          </Link>
        </NavigationMenuItem>
      ))}
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <div className='flex flex-col min-h-screen'>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className='container px-2 grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto] h-14 items-center'>
                <NavigationMenu className='hidden md:flex'>
                  <NavigationMenuList>
                    <Navbar />
                  </NavigationMenuList>
                </NavigationMenu>
                <Sheet>
                  <SheetTrigger className='md:hidden w-fit' asChild><Button className='p-3' variant="outline"><AlignJustify /></Button></SheetTrigger>
                  <div className='flex sm:hidden ms-2'>
                    <Link key={navbarLinks[0].id} href={navbarLinks[0].href}>
                      {navbarLinks[0].label}
                    </Link>
                  </div>
                  <SheetContent side={'left'} >
                    <SheetNavbar withSheetClose />
                  </SheetContent>
                </Sheet>
                <div className='flex'>
                  <SearchMovie />
                  <ModeToggle />
                </div>
              </div>
            </header>
            <main className='flex-1 my-5'>{children}</main>
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
                    <Link href="#" className="hover:underline">Contact</Link>
                  </li>
                </ul>
              </div>
            </footer>
            <Toaster position="bottom-left" />
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
