import { Root, Movies } from '@/app/interfaces/movies.interface';

export interface MovieListProps {
	movies: Movies[];
	title?: string | null;
	category?: string | null;
}