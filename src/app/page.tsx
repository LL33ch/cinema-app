import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getTopPopularAll } from './api/api';
import MovieList from '@/components/MoviesList/MoviesList';

export default async function Home({ searchParams }: {
  params: { page: number }
  searchParams: { [key: string]: number }
}) {
  const data: Root = await getTopPopularAll(searchParams?.page || 1);
  const movies: Movies[] = data.items;
  return (
    <div className='container px-2'>
      <MovieList movies={movies} category='Популярные' />
    </div >
  );
}
