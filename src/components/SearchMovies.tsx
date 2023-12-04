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

const SearchMovie = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchResults, setSearchResults] = useState<Movie[]>([]);
	const [isOpen, setIsOpen] = useState(false);

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
			const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}`, {
				method: 'GET',
				headers: {
					'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			setSearchResults(data.films || []);
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchTerm(value);
	};

	return (
		<Dialog>
			<DialogTrigger asChild><Button className='me-2 border text-muted-foreground' variant="ghost"><Search className="mr-2 h-4 w-4" /> Поиск фильмов и сериалов</Button></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Поиск фильмов</DialogTitle>
				</DialogHeader>
				<div>
					<Input value={searchTerm} onChange={handleChange} className='' placeholder="Поиск по названию" />
					<div className='grid'>
						{searchResults !== null && searchResults.length > 0 ? (
							<ScrollArea className="h-[300px] w-full border rounded-md mt-3 p-4">
								{searchResults.map((movie) => (
									<DialogTrigger asChild key={movie.filmId}>
										<Link href={`/movie/${movie.filmId}`} onClick={() => setIsOpen(false)}>
											<div className="grid grid-cols-[auto,auto,1fr] mb-2 p-2 hover:bg-muted/50">
												<div>
													<Image src={movie.posterUrl} width={32} height={48} alt={movie.nameRu} />
												</div>
												<div className='ms-2'><span className='font-medium'>{movie.nameRu}</span> <span>({movie.year})</span><br />{movie.rating ? movie.rating : ''}</div>
											</div>
										</Link>
									</DialogTrigger>
								))}
							</ScrollArea>
						) : null}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchMovie;
