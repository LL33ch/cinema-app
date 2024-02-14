'use client'

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Movie } from '@/app/interfaces/movie.interface';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default function BookmarkButton({ movie }: { movie: Movie }) {
	const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);
	const [currentBookmarks, setCurrentBookmarks] = useState<Movie | null>(null);

	async function getUserBookmarks() {
		try {
			const records = await pb.collection('bookmarks').getFullList({
				filter: `user = "${pb.authStore.model?.id}"`,
				sort: '-created',
				requestKey: null
			});
			if (records.length && records[0].movies) {
				setCurrentBookmarks(records[0].movies);
			} else {
				setCurrentBookmarks(null);
			}
		} catch (error) {
			toast.error('Ошибка при получении закладок:' + error);
			setCurrentBookmarks(null);
		}
	}

	useEffect(() => {
		getUserBookmarks();
		console.log(currentBookmarks)
	}, []);

	async function handleOnAddBookmark(movie: Movie) {

	}

	return (
		<Toggle variant={`${isAlreadyBookmarked ? 'primary' : 'outline'}`} aria-label="Toggle italic" className='ms-2' pressed={isAlreadyBookmarked} onPressedChange={() => handleOnAddBookmark(movie)}>
			{!isAlreadyBookmarked ? <Bookmark className="h-4 w-4" /> : <BookmarkCheck className="h-4 w-4" />}
		</Toggle>
	);
}
