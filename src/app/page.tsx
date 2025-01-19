'use client';
import { useState, useEffect } from 'react';
import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getTopPopularAll } from './api/api';
import MovieList from '@/components/MoviesList/MoviesList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ServerCrash } from 'lucide-react';

export default function Home({
  searchParams,
}: {
  params: { page: number };
  searchParams: { [key: string]: number };
}) {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Root = await getTopPopularAll(searchParams?.page || 1);
        setMovies(data.items);
      } catch (error: any) {
        setError('Произошла ошибка при загрузке данных.');
      }
    }

    fetchData();
  }, [searchParams?.page]);

  if (error) {
    return (
      <Alert variant='destructive'>
        <ServerCrash className='h-4 w-4' />
        <AlertTitle>Произошла ошибка</AlertTitle>
        <AlertDescription>Ошибка получения данных о фильмах, попробуйте позже.</AlertDescription>
      </Alert>
    );
  }

  return <MovieList movies={movies} category='Популярные' />;
}
