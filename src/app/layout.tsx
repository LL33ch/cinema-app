import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'
import { AlignJustify, Popcorn } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from '@/components/Footer'
import Navbar, { SheetNavbar } from '@/components/Navbar'
import Link from 'next/link'
import SearchMovie from '@/components/SearchMovies/SearchMovies'

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
                  <SheetTrigger className='md:hidden w-fit' asChild>
                    <Button className='p-3' variant="outline"><AlignJustify /></Button>
                  </SheetTrigger>
                  <div className='flex sm:hidden ms-2'>
                    <Link href='/'>
                      <Button variant="ghost" className='font-bold text-foreground backdrop-blur' >
                        <Popcorn className="mr-2 h-[1fr] w-[1fr] text-rose-600" /> Cinema-App
                      </Button>
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
