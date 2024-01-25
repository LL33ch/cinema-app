'use client'

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Movie } from '@/app/interfaces/movie.interface';
import { useState, useEffect } from 'react';

export default function BookmarkButton({ movie }: { movie: Movie }) {
	const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

	useEffect(() => {
		const currentBookmarks = localStorage.getItem('bookmarks');
		const bookmarks = currentBookmarks ? JSON.parse(currentBookmarks) : [];
		const alreadyBookmarked = bookmarks.some((bookmark: Movie) => bookmark.kinopoiskId === movie.kinopoiskId);
		setIsAlreadyBookmarked(alreadyBookmarked);
	}, [movie.kinopoiskId]);

	function handleOnAddBookmark(movie: Movie) {
		const currentBookmarks = localStorage.getItem('bookmarks');
		let bookmarks = currentBookmarks ? JSON.parse(currentBookmarks) : [];

		if (isAlreadyBookmarked) {
			bookmarks = bookmarks.filter((bookmark: Movie) => bookmark.kinopoiskId !== movie.kinopoiskId);
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
			setIsAlreadyBookmarked(false);
		} else {
			bookmarks.push(movie);
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
			setIsAlreadyBookmarked(true);
		}
	}

	return (
		<Toggle variant={`${isAlreadyBookmarked ? 'primary' : 'outline'}`} aria-label="Toggle italic" className='ms-2' pressed={isAlreadyBookmarked} onPressedChange={() => handleOnAddBookmark(movie)}>
			{!isAlreadyBookmarked ? <Bookmark className="h-4 w-4" /> : <BookmarkCheck className="h-4 w-4" />}
		</Toggle>
	);
}
