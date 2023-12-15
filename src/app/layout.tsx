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
import { AlignJustify, Film, Github, Home, Trash2, Tv } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import SearchMovie from '@/components/SearchMovies/SearchMovies'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from '@/components/Footer'

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
  }
];


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
          <Link href={item.href} className='pe-2'>
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
          defaultTheme="light"
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
            <Footer />
            <Toaster position="bottom-left" />
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
