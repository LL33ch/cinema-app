'use client'
import { useState, useEffect } from 'react';
import MovieList from '../MoviesList/MoviesList';
import { Movie } from '@/app/interfaces/movie.interface';
import PocketBase from 'pocketbase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function BookmarksMovies() {
	const [moviesData, setMoviesData] = useState<Movie[] | null>(null);
	const [isLoading, setIsLoading] = useState(true); // Добавлено состояние для индикации загрузки

	async function getUserBookmarks() {
		try {
			const records = await pb.collection('bookmarks').getFullList({
				filter: `user = "${pb.authStore.model?.id}"`,
				sort: '-created',
				requestKey: null
			});
			if (records.length && records[0].movies) {
				setMoviesData(records[0].movies);
			} else {
				setMoviesData(null);
			}
		} catch (error) {
			toast.error('Ошибка при получении закладок:' + error);
			setMoviesData(null);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getUserBookmarks();
	}, []);

	if (isLoading) {
		return (
			<div className='w-full grid justify-center'>
				<Loader2 className='animate-spin h-5 w-5 me-2' />
			</div>
		);
	}

	if (moviesData === null) {
		return <span>У вас нет закладок</span>;
	}

	return <MovieList movies={moviesData} title='Закладки' />;
}