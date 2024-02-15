'use client'

import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Movie } from '@/app/interfaces/movie.interface';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import PocketBase from 'pocketbase';
import { useAuth } from '../Auth/AuthContext';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function BookmarkButton({ movie }: { movie: Movie }) {
	const [isLoading, setIsLoading] = useState(false)
	const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);
	const [bookmarkId, setBookmarkId] = useState<string | null>(null)
	const [currentBookmarks, setCurrentBookmarks] = useState<Movie[]>([]);
	const hasFetchedBookmarks = useRef(false);
	const { isAuthenticated } = useAuth();

	async function getUserBookmarks() {
		setIsLoading(true)
		try {
			const records = await pb.collection('bookmarks').getFullList({
				filter: `user = "${pb.authStore.model?.id}"`,
				sort: '-created'
			});
			records.length && setBookmarkId(records[0].id)
			console.log(records.length)
			if (!records.length) {
				const createBookmark = await pb.collection('bookmarks').create({ user: pb.authStore.model?.id, movies: "[]" })
				setBookmarkId(createBookmark.id)
				setCurrentBookmarks([]);
			}
			if (records.length && records[0].movies) {
				setCurrentBookmarks(records[0].movies);
			} else {
				setCurrentBookmarks([]);
			}
			setIsLoading(false)
		} catch (error) {
			toast.error('Ошибка при получении закладок. ' + error);
			setCurrentBookmarks([]);
		}
	}

	useEffect(() => {
		if (!hasFetchedBookmarks.current && isAuthenticated) {
			getUserBookmarks();
			hasFetchedBookmarks.current = true;
		}
	}, [isAuthenticated]);

	useEffect(() => {
		const alreadyBookmarked = currentBookmarks.some(bookmark => bookmark.kinopoiskId === movie.kinopoiskId);
		setIsAlreadyBookmarked(alreadyBookmarked);
	}, [currentBookmarks, movie.kinopoiskId]);

	async function handleOnAddBookmark(movie: Movie) {
		if (bookmarkId) {
			try {
				if (isAlreadyBookmarked) {
					const removeBookmark = currentBookmarks.filter((bookmark: Movie) => bookmark.kinopoiskId !== movie.kinopoiskId);

					await pb.collection('bookmarks').update(bookmarkId, { movies: removeBookmark });
					setIsAlreadyBookmarked(false);
					toast('Удалено из закладок');
				} else {
					currentBookmarks.push(movie);
					await pb.collection('bookmarks').update(bookmarkId, { movies: currentBookmarks });
					toast('Добавлено в закладки');
					setIsAlreadyBookmarked(true);
				}
			} catch (error) {
				toast.error('Ошибка при редактировании закладок. ' + error);
				setCurrentBookmarks([]);
			}
		}
	}
	if (!isAuthenticated) return null;

	return (
		<Toggle variant={`${isAlreadyBookmarked ? 'primary' : 'outline'}`} aria-label="Toggle italic" className='ms-2' pressed={isAlreadyBookmarked} onPressedChange={() => handleOnAddBookmark(movie)} disabled={isLoading}>
			{isLoading ? <Loader2 className='animate-spin h-4 w-4' /> : !isAlreadyBookmarked ? <Bookmark className="h-4 w-4" /> : <Bookmark className="h-4 w-4 fill-yellow-500 text-yellow-500" />}

		</Toggle>
	);
}
