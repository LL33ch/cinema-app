import type { Metadata } from 'next'
import Link from "next/link"
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'
import { AlignJustify, Film, Home } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import SearchMovie from '@/components/SearchMovies'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Cinema Next App by MrRobot (MrR504)',
  description: 'cinema-next-app',
}

const navbarLinks = [
  {
    id: 1,
    href: "/",
    label: (
      <Button variant="outline" >
        <Film className="mr-2 h-4 w-4" /> Cinema-App
      </Button>),
  },
  {
    id: 2,
    href: "/movies",
    label: (<Button variant="ghost">Фильмы</Button>)
  },
  {
    id: 3,
    href: "/serials",
    label: (<Button variant="ghost">Сериалы</Button>)
  },
  {
    id: 4,
    href: "https://github.com/MrR504/cinema-app",
    label: (<Button variant="ghost">Github</Button>),
    target: "_blank"
  }
];

const SheetNavbar = (props: any) => {
  const [SheetCloseWrapper, shetCloseWrapperProps] = props.withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  return (
    <div className='flex flex-col space-y-3 font-medium mt-5 pb-10 pl-6'>
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
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='container px-3 grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto] h-14 items-center'>
              <NavigationMenu className='hidden md:flex'>
                <NavigationMenuList>
                  <Navbar />
                </NavigationMenuList>
              </NavigationMenu>
              <Sheet>
                <SheetTrigger className='md:hidden w-fit' asChild><Button variant="outline"><AlignJustify /></Button></SheetTrigger>
                <Link className='flex sm:hidden ms-2' key={navbarLinks[0].id} href={navbarLinks[0].href}>
                  {navbarLinks[0].label}
                </Link>
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
          {children}
          <Toaster position="top-center" expand={true} richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
