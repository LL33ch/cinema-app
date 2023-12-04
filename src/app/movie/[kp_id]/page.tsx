import { Movie } from '@/app/interfaces/movie.interface';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { Bookmark, MonitorPlay } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import KinopoiskIcon from '/public/kinopoisk.svg';
import ImdbIcon from '/public/imdb.svg';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Movies } from '@/app/interfaces/similar-movies.interface';
import WatchMovie from '@/components/WatchMovie';
import Notification from '@/components/Notification';

async function getMovieData({ params }: { params: { kp_id: number } }) {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${params.kp_id}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

async function getSimilarMoviesData({ params }: { params: { kp_id: number } }) {
	const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${params.kp_id}/similars`, {
		method: 'GET',
		headers: {
			'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
			'Content-Type': 'application/json',
		},
	});
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

function getRatingColorClass(rating: number) {
	switch (true) {
		case rating >= 8:
			return 'fill-amber-300 text-amber-300 bg-amber-300/25 hover:bg-amber-300/30';
		case rating > 7:
			return 'fill-green-500 text-green-500 bg-green-500/25 hover:bg-green-500/30';
		case rating <= 7:
			return 'fill-stone-400 text-stone-400 bg-stone-400/25 hover:bg-stone-400/30';
		default:
			return 'fill-stone-400 text-stone-400 bg-stone-400/25 hover:bg-stone-400/30';
	}
}

export default async function MoviePage({ params }: { params: { kp_id: number } }) {
	try {
		const MovieData = await getMovieData({ params });
		const movie: Movie = MovieData;

		const SimilarMoviesData = await getSimilarMoviesData({ params });
		const movies: Movies[] = SimilarMoviesData.items;
		const limitedMovies = movies.slice(0, 5);

		const SimilarMoviesArray = limitedMovies.map((movie) => {
			return (
				<div key={movie.filmId} className='dark:bg-zinc-900/50 p-5 border rounded-lg ease-in duration-200 hover:shadow-lg'>
					<Link href={`/movie/${movie.filmId}`} passHref>
						<Image src={movie.posterUrl} width={500} height={700} alt="test" />
						<div className='pt-2'>
						</div>
					</Link>
				</div>
			);
		});

		return (
			<main>
				<div className="container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg">
					<div className='grid md:grid-cols-[auto,auto,1fr] sm:grid-cols-[auto] gap-10 mb-5'>
						<div>
							<Image
								src={movie.posterUrl}
								width={500}
								height={700}
								alt={movie.nameRu}
							/>
						</div>
						<div>
							<h1 className="text-4xl font-bold">{movie.nameRu} ({movie.year})</h1>
							<h3 className='mt-3 text-stone-400'>{movie.nameOriginal}</h3>
							<Link href={movie.webUrl} target='_blank'>
								<Button className='my-5'>
									<MonitorPlay className="mr-2 h-4 w-4" /> Смотреть
								</Button>
							</Link>
							<Toggle aria-label="Toggle italic" className='ms-2'>
								<Bookmark className="h-4 w-4" />
							</Toggle>
							<h4 className='dark:text-stone-300'>{movie.shortDescription}</h4>
							<h2 className='my-3 font-medium'>О фильме:</h2>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>Год производства:</TableCell>
										<TableCell>{movie.year}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Страна производства:</TableCell>
										<TableCell>{movie.countries.map(Сountry => Сountry.country).join(', ')}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Жанры:</TableCell>
										<TableCell>{movie.genres.map(Genre => Genre.genre).join(', ')}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Слоган:</TableCell>
										<TableCell><span className='dark:text-stone-300 italic'>«{movie.slogan}»</span></TableCell>
									</TableRow>
								</TableBody>
							</Table>

						</div>
						{movie.ratingKinopoisk && (
							<div>
								<div className='inline-flex'>
									<TooltipProvider delayDuration={200}>
										<Tooltip>
											<TooltipTrigger >
												<Badge className={`text-xl me-2 ${getRatingColorClass(movie.ratingKinopoisk)}`}>
													<KinopoiskIcon className='me-2' />{movie.ratingKinopoisk}
												</Badge>
												<TooltipContent>Рейтинг КиноПоиск: {movie.ratingKinopoisk}</TooltipContent>
											</TooltipTrigger>
										</Tooltip>
									</TooltipProvider>
									<TooltipProvider delayDuration={200}>
										<Tooltip>
											<TooltipTrigger>
												<Badge className='text-xl  text-stone-400 bg-stone-400/25 hover:bg-stone-400/30'>
													<ImdbIcon className='me-2 fill-stone-400' />{movie.ratingImdb}
												</Badge>
												<TooltipContent>Рейтинг IMDB: {movie.ratingKinopoisk}</TooltipContent>
											</TooltipTrigger>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						)}
					</div>
					<Separator className="my-4" />
					<p>{movie.description}</p>
				</div>
				<WatchMovie id={movie.kinopoiskId} />
				{SimilarMoviesArray.length > 0 ? (
					<div className="container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg">
						<h2 className='text-lg mb-5 font-medium'>Похожие фильмы</h2>
						<div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
							{SimilarMoviesArray}
						</div>
					</div>
				) : null}
				<Image className='absolute top-0 left-1/2 transform -translate-x-1/2 z-[-1] blur-xl opacity-0 dark:opacity-20' src={movie.coverUrl || ''} width={1500} height={1500} alt={movie.nameRu} />
			</main >
		);
	} catch (error) {
		return <Notification type="error" message={`Произошла ошибка на сервере: ${error}`} />
	}
}
