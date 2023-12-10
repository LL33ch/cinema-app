import MovieCard from '@/components/MovieCard';
import { Movies, Root } from '@/app/interfaces/movies.interface';

import { getCatastropheMovies, getFamilyMovies, getLoveMovies, getSoonMovies, getTop250Movies, getTop250Serials, getTopPopularAll, getZombieMovies } from '@/app/api/api';
import SelectCategory from '@/components/SelectCategory';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export function generateStaticParams() {
	return [
		{ collection: 'top250-movies' },
		{ collection: 'top250-serials' },
		{ collection: 'closes-release' },
		{ collection: 'family' },
		{ collection: 'love' },
		{ collection: 'zombie' },
		{ collection: 'catastrophe' },
	]
}

export const metadata: Metadata = {
	title: 'Коллекции фильмов',
	description: 'Коллекции фильмов - Cinema App',
};

export default async function Collection({ params }: { params: { collection: string } }) {
	const collection = params.collection;
	let collectionName;
	let data: Root;

	switch (collection) {
		case 'top250-movies':
			data = await getTop250Movies();
			collectionName = 'Топ 250 фильмов'
			break;
		case 'top250-serials':
			data = await getTop250Serials();
			collectionName = 'Топ 250 сериалов'
			break;
		case 'closes-release':
			data = await getSoonMovies();
			collectionName = 'Скоро выходит'
			break;
		case 'family':
			data = await getFamilyMovies();
			collectionName = 'Семейные фильмы'
			break;
		case 'love':
			data = await getLoveMovies();
			collectionName = 'Фильмы про любовь'
			break;
		case 'zombie':
			data = await getZombieMovies();
			collectionName = 'Фильмы про зомби'
			break;
		case 'catastrophe':
			data = await getCatastropheMovies();
			collectionName = 'Фильмы про катастрофы'
			break;
		default:
			return notFound();
	}
	const movies: Movies[] = data.items;

	metadata.title = collectionName;


	return (
		<div className='container px-2'>
			<div>
				<SelectCategory category={collectionName} />
			</div>
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