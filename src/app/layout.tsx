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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'
import { AlignJustify, Home, Film, Search } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import SearchMovie from '@/components/SearchMovies'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Cinema Next App by MrRobot (MrR504)',
  description: 'cinema-next-app',
}

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
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='container px-3 grid grid-cols-[1fr_auto] h-14 items-center'>
              <div className='mr-4 hidden md:flex'>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <Button variant="outline" size="icon">
                          <Home className="h-4 w-4" />
                        </Button>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Link href="/movies" legacyBehavior passHref>
                          <Button variant="ghost">Фильмы</Button>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Link href="/serials" legacyBehavior passHref>
                          <Button variant="ghost">Сериалы</Button>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <Sheet>
                <SheetTrigger className='md:hidden w-fit' asChild><Button variant="outline"><AlignJustify /></Button></SheetTrigger>
                <SheetContent side={'left'} >
                  <SheetHeader>
                    <SheetDescription className='mt-50'>
                      <Link href="/" legacyBehavior passHref>
                        <Button type='submit' className='w-full' variant="link" size="icon"><Home className="mr-2 h-4 w-4" /> Главная</Button>
                      </Link>
                      <Link href="/movies" legacyBehavior passHref>
                        <Button className='w-full' variant="link"><Film className="mr-2 h-4 w-4" /> Фильмы</Button>
                      </Link>
                      <Link href="/serials" legacyBehavior passHref>
                        <Button className='w-full' variant="link"><Film className="mr-2 h-4 w-4" /> Сериалы</Button>
                      </Link>
                    </SheetDescription>
                  </SheetHeader>
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
