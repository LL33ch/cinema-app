import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getMovies } from '../api/api';
import MovieList from '@/components/MoviesList/MoviesList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ServerCrash } from 'lucide-react';

export default async function MoviesPage() {
  let movies: Movies[] = [];
  let error: string | null = null;

  try {
    const data: Root = await getMovies();
    movies = data.items;
  } catch (err: any) {
    error = 'Произошла ошибка при загрузке данных.';
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <ServerCrash className='h-4 w-4' />
        <AlertTitle>Произошла ошибка</AlertTitle>
        <AlertDescription>Ошибка получения данных о фильмах, попробуйте позже.</AlertDescription>
      </Alert>
    );
  }

  return <MovieList movies={movies} category='Фильмы' />;
}
