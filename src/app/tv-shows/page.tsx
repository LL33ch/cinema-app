import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getTVShows } from '../api/api';
import MovieList from '@/components/MoviesList/MoviesList';

export default async function Home() {
	const data: Root = await getTVShows();
	const movies: Movies[] = data.items;

	return (
		<MovieList movies={movies} title='ТВ-Шоу' />
	);
}
