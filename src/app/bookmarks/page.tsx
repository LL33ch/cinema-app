import BookmarksMovies from '@/components/Bookmark/BookmarksMovies'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Закладки',
	description: 'Ваши закладки',
}

export default function Bookmarks() {
	return (
		<BookmarksMovies />
	)
}