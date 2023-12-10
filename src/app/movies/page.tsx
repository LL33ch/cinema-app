import MovieCard from '@/components/MovieCard/MovieCard';
import { Movies, Root } from '@/app/interfaces/movies.interface';

import { getMovies } from '../api/api';
import SelectCategory from '@/components/SelectCategory/SelectCategory';

export default async function Home() {
	const data: Root = await getMovies();
	const movies: Movies[] = data.items;

	return (
		<div className='container px-2'>
			<div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
					{movies.map((movie) => (
						<MovieCard key={movie.kinopoiskId} movie={movie} />
					))}
				</div>
			</div>
		</div>
	);
}
