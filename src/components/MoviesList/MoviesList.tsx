'use client'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import SelectCategory from '@/components/SelectCategory/SelectCategory';
import { MovieCardGrid, MovieCardList } from '@/components/MovieCard/MovieCard';
import { Grid2X2, StretchHorizontal } from 'lucide-react';
import { MovieListProps } from './MoviesList.props';
import { useEffect, useState } from 'react';

export const MovieList: React.FC<MovieListProps> = ({ movies, title, category }) => {
	const [viewMode, setViewMode] = useState<string>();

	useEffect(() => {
		const getViewMode: string | null = localStorage.getItem('view-mode');
		if (getViewMode !== null) {
			setViewMode(getViewMode);
		} else {
			setViewMode('list')
		}
	}, []);

	function changeViewMode(mode: string) {
		if (mode === 'list') {
			localStorage.setItem('view-mode', mode);
			setViewMode(mode)
		}
		if (mode === 'grid') {
			localStorage.setItem('view-mode', mode);
			setViewMode(mode)
		}
	}

	return (
		<Tabs value={viewMode} className="w-full">
			<div className='flex justify-between items-center mb-3'>
				{title && (
					<div className='text-center md:text-left'>
						<h1 className='text-xl font-bold'>{title}</h1>
					</div>
				)}
				{category && (
					<div className='mx-auto md:mx-0'>
						<SelectCategory category={category} />
					</div>
				)}
				<TabsList className="hidden lg:grid w-fit grid-cols-2">
					<TabsTrigger value="list" onClick={() => changeViewMode('list')}><StretchHorizontal className="h-4 w-4" /></TabsTrigger>
					<TabsTrigger value="grid" onClick={() => changeViewMode('grid')}><Grid2X2 className="h-4 w-4" /></TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="list">
				<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
					{movies.map((movie) => (
						<MovieCardList key={movie.kinopoiskId} movie={movie} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="grid">
				<div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
					{movies.map((movie) => (
						<MovieCardGrid key={movie.kinopoiskId} movie={movie} />
					))}
				</div>
			</TabsContent>
		</Tabs >
	);
};

export default MovieList;