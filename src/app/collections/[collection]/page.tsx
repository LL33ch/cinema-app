import { Movies, Root } from '@/app/interfaces/movies.interface';
import { getCatastropheMovies, getFamilyMovies, getLoveMovies, getSoonMovies, getTop250Movies, getTop250Serials, getTopPopularAll, getZombieMovies } from '@/app/api/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import MovieList from '@/components/MoviesList/MoviesList';

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
	let collectionName = 'Коллекции фильмов';
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
			<MovieList movies={movies} category={collectionName} />
		</div>
	);
}