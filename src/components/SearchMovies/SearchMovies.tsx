"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { Movie } from '@/app/interfaces/search-movies';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { searchByKeyword } from '@/app/api/api';
import { Skeleton } from '@/components/ui/skeleton';

const SearchMovie = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchResults, setSearchResults] = useState<Movie[]>([]);
	const [emptyResults, setEmptyResults] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				handleSearch();
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleSearch = async () => {
		try {
			setIsLoading(true); // Set loading state to true while fetching data
			const data = await searchByKeyword(searchTerm);
			setSearchResults(data.films || []);
			setEmptyResults(data.films && data.films.length === 0);
		} catch (error) {
			console.error('Error fetching search results:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const emptyMessage = (
		<span className='block text-stone-400 text-sm mt-5'>Ничего не найдено</span>
	);

	useEffect(() => {
	}, [searchResults]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchTerm(value);
	};

	const SkeletonLoading: React.FC = () => (
		<div>
			{[1, 2, 3, 4].map((index) => (
				<div key={index} className="flex items-center space-x-4 mt-3">
					<Skeleton className="h-12 w-8 rounded-lg" />
					<div className="space-y-6">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			))}
		</div>
	);

	return (
		<Dialog>
			<DialogTrigger asChild><Button className='me-2 p-3 border text-muted-foreground' variant="outline"><Search className="md:mr-2 h-[1.2rem] w-[1.2rem] dark:text-white md:text-inherit" /> <span className='hidden md:block'>Поиск фильмов и сериалов</span></Button></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Поиск фильмов и сериалов</DialogTitle>
				</DialogHeader>
				<div>
					<Input value={searchTerm} onChange={handleChange} className='' placeholder="Поиск по названию" />
					<>
						{isLoading ? (
							<ScrollArea className="h-[300px] w-full border rounded-md mt-3 p-4">
								<SkeletonLoading />
							</ScrollArea>
						) : searchResults !== null && searchResults.length > 0 ? (
							<ScrollArea className="h-[300px] w-full border rounded-md mt-3 p-4">
								{searchResults.map((movie) => (
									<DialogTrigger asChild key={movie.filmId} className='grid'>
										<Link key={movie.filmId} href={`/movie/${movie.filmId}`}>
											<div className="grid grid-cols-[auto,1fr] mb-1 p-2 rounded hover:bg-muted/50">
												<div>
													<Image className='rounded' src={movie.posterUrl} width={35} height={51} alt={movie.nameRu} />
												</div>
												<div className='ms-3'><span className='font-medium'>{movie.nameRu}</span> <span>({movie.year})</span><br />{movie.rating ? movie.rating : ''}</div>
											</div>
										</Link>
									</DialogTrigger>
								))}
							</ScrollArea>
						) : emptyResults && emptyMessage}
					</>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchMovie;
