'use client'
import MovieList from '../MoviesList/MoviesList';

export default function BookmarksMovies() {
	const currentBookmarks = localStorage.getItem('bookmarks');
	if (!currentBookmarks) {
		return (
			<div className='container px-2'>
				У вас нет закладок.
			</div>
		)
	}
	const moviesData = JSON.parse(currentBookmarks)
	return (
		<div className='container px-2'>
			<MovieList movies={moviesData} />
		</div>
	)
}