'use client';
'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useMediaQuery } from '@/lib/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Script from 'next/script';
import { useAuth } from '../Auth/AuthContext';
import KinoboxPlayer from '../Players/KinoboxPlayer';

interface WatchMovieIframeProps {
  IframeSrc?: string;
  kp_id: number;
}

export function WatchMovieButton() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isAccess, isAuthenticated } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isAccess, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link href='/auth/login'>
        <Button className='my-5'>
          <MonitorPlay className='mr-2 h-4 w-4' />
          Смотреть
        </Button>
      </Link>
    );
  }
  if (!isAuthenticated) {
    return (
      <Link href='/auth/login'>
        <Button className='my-5'>
          <MonitorPlay className='mr-2 h-4 w-4' />
          Смотреть
        </Button>
      </Link>
    );
  }

  if (!isAccess) {
    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className='my-5'>
              <MonitorPlay className='mr-2 h-4 w-4' />
              Смотреть
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Просмотр фильмов недоступен</DialogTitle>
              <DialogDescription>
                Во избежании блокировок, общедоступный просмотр фильмов недоступен. Обратитесь к
                администратору.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    } else {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className='my-5'>
              <MonitorPlay className='mr-2 h-4 w-4' />
              Смотреть
            </Button>
          </DrawerTrigger>
          <DrawerContent className='px-4 mb-2'>
            <DrawerHeader className='text-left px-0'>
              <DrawerTitle>Просмотр фильмов недоступен</DrawerTitle>
              <DrawerDescription>
                Во избежании блокировок, общедоступный просмотр фильмов недоступен. Обратитесь к
                администратору.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );
    }
  } else {
    return (
      <Link href='#iframe'>
        <Button className='my-5'>
          <MonitorPlay className='mr-2 h-4 w-4' />
          Смотреть
        </Button>
      </Link>
    );
  }
}

export function WatchMovieIframe({ IframeSrc, kp_id }: WatchMovieIframeProps) {
  const { isAccess } = useAuth();

  if (isAccess) {
    return (
      <div className='App bg-zinc-900/80 border mt-3 rounded-lg p-3'>
        <header className='App-header'>
          <KinoboxPlayer kpId={kp_id} />
        </header>
      </div>
    );
  }

  return null;
}

export default WatchMovieButton;
