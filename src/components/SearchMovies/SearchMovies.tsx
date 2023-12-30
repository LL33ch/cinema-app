"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { Movie } from '@/app/interfaces/search-movies';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { searchByKeyword } from '@/app/api/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/lib/hooks';

const SearchMovie = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchResults, setSearchResults] = useState<Movie[]>([]);
	const [emptyResults, setEmptyResults] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				handleSearch();
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

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

	const SkeletonLoading = () => (
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

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className='me-2 p-3 border text-muted-foreground' variant="outline">
						<Search className="md:mr-2 h-[1.2rem] w-[1.2rem] dark:text-white md:text-inherit" />
						<span className='hidden md:flex'>Поиск фильмов и сериалов
							<p className="text-sm text-muted-foreground ms-4">
								<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
									<span className="text-xs">⌘</span>K
								</kbd>
							</p>
						</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Поиск фильмов и сериалов</DialogTitle>
						<DialogDescription>
							Введите название фильма или сериала.
						</DialogDescription>
					</DialogHeader>
					<div>
						<Input value={searchTerm} onChange={handleChange} placeholder="Поиск по названию" />
						{isLoading ? (
							<ScrollArea className="h-[300px] w-full border rounded-md mt-3 p-4">
								<SkeletonLoading />
							</ScrollArea>
						) : searchResults !== null && searchResults.length > 0 ? (
							<ScrollArea className="h-[300px] w-full border rounded-md mt-3 p-4">
								{searchResults.map((movie) => (
									<DialogTrigger key={movie.filmId} className='grid' asChild>
										<Link href={`/movie/${movie.filmId}`}>
											<div className="grid grid-cols-[auto,1fr] mb-1 p-2 rounded hover:bg-muted/50">
												<Image className='rounded' src={movie.posterUrl} width={35} height={51} alt={movie.nameRu} />
												<div className='ms-3'><span className='font-medium'>{movie.nameRu}</span> <span>({movie.year})</span><br />{movie.rating ? movie.rating : ''}</div>
											</div>
										</Link>
									</DialogTrigger>
								))}
							</ScrollArea>
						) : emptyResults && emptyMessage}
					</div>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button className='me-2 p-3 border text-muted-foreground' variant="outline">
						<Search className="md:mr-2 h-[1.2rem] w-[1.2rem] dark:text-white md:text-inherit" />
						<span className='hidden md:flex'>Поиск фильмов и сериалов
							<p className="text-sm text-muted-foreground ms-4">
								<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
									<span className="text-xs">⌘</span>K
								</kbd>
							</p>
						</span>
					</Button>
				</DrawerTrigger>
				<DrawerContent className='h-[85%] px-4'>
					<DrawerHeader className="text-left px-0">
						<DrawerTitle>Поиск фильмов и сериалов</DrawerTitle>
						<DrawerDescription>
							Введите название фильма или сериала.
						</DrawerDescription>
					</DrawerHeader>
					<div className='pb-2'>
						<Input value={searchTerm} onChange={handleChange} className='' placeholder="Поиск по названию" />
						{isLoading ? (
							<ScrollArea className="h-[500px] w-full border rounded-md mt-3 p-4">
								<SkeletonLoading />
							</ScrollArea>
						) : searchResults !== null && searchResults.length > 0 ? (
							<ScrollArea className="h-[500px] w-full border rounded-md mt-3 p-4">
								{searchResults.map((movie) => (
									<DrawerTrigger key={movie.filmId} className='grid' asChild>
										<Link href={`/movie/${movie.filmId}`}>
											<div className="grid grid-cols-[auto,1fr] mb-1 p-2 rounded hover:bg-muted/50">
												<Image className='rounded' src={movie.posterUrl} width={35} height={51} alt={movie.nameRu} />
												<div className='ms-3'><span className='font-medium'>{movie.nameRu}</span> <span>({movie.year})</span><br />{movie.rating ? movie.rating : ''}</div>
											</div>
										</Link>
									</DrawerTrigger>
								))}
							</ScrollArea>
						) : emptyResults && emptyMessage}
					</div>
				</DrawerContent>
			</Drawer>
		);
	};
};

export default SearchMovie;
