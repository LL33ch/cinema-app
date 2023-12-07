import { Movie } from '@/app/interfaces/movie.interface';
import Image from 'next/image';
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
import { Metadata } from 'next';
import { getMovie, getSimilarMovies } from '@/app/api/api';
import Notification from '@/components/Notification';


let dynamicTitle;

export const metadata: Metadata = {
	title: '',
	description: 'cinema-next-app',
};

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
	const kp_id = params.kp_id;
	try {
		const MovieData = await getMovie(kp_id);
		const movie: Movie = MovieData;

		dynamicTitle = `${movie.nameRu} ${movie.nameOriginal ? `/ ${movie.nameOriginal}` : ''} (${movie.year})`;
		metadata.title = dynamicTitle;

		const SimilarMoviesData = await getSimilarMovies(kp_id);
		const movies: Movies[] = SimilarMoviesData.items;
		const limitedMovies = movies.slice(0, 5);

		const SimilarMoviesArray = limitedMovies.map((movie) => {
			return (
				<div key={movie.filmId} className='dark:bg-zinc-900/50 p-5 border rounded-lg ease-in duration-200 hover:shadow-lg'>
					<Link href={`/movie/${movie.filmId}`} passHref>
						<Image src={movie.posterUrl} width={500} height={700} alt={movie.nameRu} />
						<div className='pt-2'>
						</div>
					</Link>
				</div>
			);
		});

		return (
			<>
				<div className="absolute inset-0 -z-10 blur opacity-0 dark:opacity-20 bg-cover" style={{ backgroundImage: `url(${movie.coverUrl})` }} />
				<div className="container p-5 bg-white/25 dark:bg-zinc-900/50 border rounded-lg backdrop-blur-xl">
					<div className='grid md:grid-cols-[1fr,2fr,auto] sm:grid-cols-[auto] gap-10 mb-5'>
						<div>
							<Image
								src={movie.posterUrl}
								width={400}
								height={600}
								alt={movie.nameOriginal}
							/>
						</div>
						<div>
							<h1 className="text-4xl font-bold">{movie.nameRu} ({movie.year})</h1>
							<h3 className='mt-3 text-stone-400'>{movie.nameOriginal}</h3>
							<WatchMovie MovieId={movie.kinopoiskId} element='button' />
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
						{(movie.ratingKinopoisk || movie.ratingImdb) && (
							<div>
								<div className='inline-flex'>
									{movie.ratingKinopoisk && (
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
									)}
									{movie.ratingImdb && (
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
									)}
								</div>
							</div>
						)}
					</div>
					<Separator className="my-4" />
					<p>{movie.description}</p>
				</div>
				<WatchMovie MovieId={movie.kinopoiskId} element='iframe' />
				{SimilarMoviesArray.length > 0 && (
					<div className="container mt-5 p-5 backdrop-blur-xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg">
						<h2 className='text-lg mb-5 font-medium'>Похожие фильмы</h2>
						<div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
							{SimilarMoviesArray}
						</div>
					</div>
				)}
			</>
		);
	} catch (error) {
		return <Notification type="error" message={`Произошла ошибка на сервере: ${error}`} />
	}
}
