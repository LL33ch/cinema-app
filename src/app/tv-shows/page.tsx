import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getTVShows } from '../api/api';
import MovieList from '@/components/MoviesList/MoviesList';
import { ServerCrash } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function TVShowsPage() {
  let movies: Movies[] = [];
  let error: string | null = null;

  try {
    const data: Root = await getTVShows();
    movies = data.items;
  } catch (err: any) {
    error = 'Произошла ошибка при загрузке данных.';
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <ServerCrash className='h-4 w-4' />
        <AlertTitle>Произошла ошибка</AlertTitle>
        <AlertDescription>Ошибка получения данных о ТВ-шоу, попробуйте позже.</AlertDescription>
      </Alert>
    );
  }

  return <MovieList movies={movies} title='ТВ-Шоу' />;
}
