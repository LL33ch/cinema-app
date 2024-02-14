import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'
import { AlignJustify, Bookmark, Popcorn } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from '@/components/Footer'
import Navbar, { SheetNavbar } from '@/components/Navbar'
import Link from 'next/link'
import SearchMovie from '@/components/SearchMovies/SearchMovies'
import AuthButton from '@/components/Auth/AuthButton'
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from '@/components/Auth/AuthContext';

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
      {/* <head>
        <meta name="application-name" content="Cinema App by MrRobot" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cinema App by MrRobot" />
        <meta name="description" content="Cinema Next App by MrRobot (MrR504)" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://cinema-app-mrr504.vercel.app" />
        <meta name="twitter:title" content="Cinema App by MrRobot" />
        <meta name="twitter:description" content="Cinema Next App by MrRobot (MrR504)" />
        <meta name="twitter:image" content="https://cinema-app-mrr504.vercel.app/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cinema App by MrRobot" />
        <meta property="og:description" content="Cinema Next App by MrRobot (MrR504)" />
        <meta property="og:site_name" content="Cinema App by MrRobot" />
        <meta property="og:url" content="https://cinema-app-mrr504.vercel.app" />
        <meta property="og:image" content="https://cinema-app-mrr504.vercel.app/icons/apple-touch-icon.png" />
      </head> */}

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <div className='flex flex-col min-h-screen'>
            <AuthProvider>
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
                    <AuthButton />
                  </div>
                </div>
              </header>
              <main className='flex-1 my-5 container px-2'>{children}</main>
              <Footer />
              <Toaster richColors position="bottom-left" />
            </AuthProvider>
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
