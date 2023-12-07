import { Root } from '../interfaces/search-movies';

const requestOptions = {
	method: 'GET',
	headers: {
		'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
		'Content-Type': 'application/json',
	},
}

export async function getTopPopularAll() {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1`, requestOptions);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export async function getTop250Movies() {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1`, requestOptions);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export async function getMovie(kp_id: number) {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${kp_id}`, requestOptions);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export async function getSimilarMovies(kp_id: number) {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${kp_id}/similars`, requestOptions);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function searchByKeyword(searchTerm: string) {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}`, requestOptions,);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}