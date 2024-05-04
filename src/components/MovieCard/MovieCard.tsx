import Link from 'next/link';
import Image from 'next/image';
import { Dot, Star } from 'lucide-react';
import MovieCardProps from './MovieCard.props';

function getRatingColorClass(rating: number) {
	switch (true) {
		case rating >= 8:
			return 'fill-amber-300 text-amber-500 dark:text-amber-500';
		case rating > 7:
			return 'fill-green-500 text-green-700 dark:text-green-500';
		case rating <= 7:
			return 'fill-stone-400 text-stone-600 dark:text-stone-400';
		default:
			return 'fill-stone-400 text-stone-600 dark:text-stone-400';
	}
}

export const MovieCardList: React.FC<MovieCardProps> = ({ movie }) => {
	return (
		<div className="bg-cover bg-center rounded-lg h-fit transition-all hover:scale-[1.01] relative">
			<Image src={movie.posterUrl} className='hidden dark:block rounded-lg object-cover absolute inset-0' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} fill={true} alt={movie.nameRu} />
			<Link href={`/movie/${movie.kinopoiskId}`} passHref>
				<div className='dark:bg-zinc-900/50 bg-white dark:bg-gradient-to-r from-black via-black/70 dark:backdrop-brightness-50 dark:hover:backdrop-brightness-100 backdrop-blur-sm hover:backdrop-blur-none hover:border-zinc-600 p-5 border rounded-lg transition duration-150 ease-in-out hover:shadow-lg'>
					<div className='grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-5 h-full'>
						<Image className='w-[110px] h-[156px] object-cover aspect-auto' src={movie.posterUrl} width={110} height={156} alt={movie.nameRu} priority={true} />
						<div>
							<h2 className='font-bold text-xl flex'>{movie.nameRu}
								{movie.ratingKinopoisk && (<span className={`text-base flex md:hidden items-center font-medium ms-2 ${getRatingColorClass(movie.ratingKinopoisk)}`}><Star className='h-4 w-4 me-1' />{movie.ratingKinopoisk}</span>)}
							</h2>
							<h3 className='text-sm mt-2'>{movie.nameOriginal ? `${movie.nameOriginal},` : ''} {movie.year}</h3>
							<h3 className='flex text-stone-400 text-sm mt-2'>{movie.countries.map(Сountry => Сountry.country).join(', ')}<Dot />{movie.genres.map(Genre => Genre.genre).join(', ')}</h3>
						</div>
						<div className='justify-self-end hidden md:block'>
							{movie.ratingKinopoisk && (<span className={`text-base flex items-center font-medium ${getRatingColorClass(movie.ratingKinopoisk)}`}><Star className='h-4 w-4 me-1' />{movie.ratingKinopoisk}</span>)}
						</div>
					</div>
				</div>
			</Link>

		</div>
	);
};

export const MovieCardGrid: React.FC<MovieCardProps> = ({ movie }) => {
	return (
		<Link href={`/movie/${movie.kinopoiskId}`} passHref>
			<div className='dark:bg-zinc-900/50 p-5 border rounded-lg transition-all hover:shadow-lg hover:scale-[1.01] hover:border-zinc-600 h-full'>
				<Image src={movie.posterUrl} width={220} height={330} alt={movie.nameRu} className='rounded w-full sm:max-h-[310px]' />
				<div className='pt-2'>
					<div className='flex justify-between'>
						<h3 className='font-medium'>{movie.nameRu}</h3>
						{movie.ratingKinopoisk && (<span className={`flex items-center ms-2 font-medium ${getRatingColorClass(movie.ratingKinopoisk)}`}><Star className='h-4 w-4 me-1' />{movie.ratingKinopoisk}</span>)}
					</div>
					<span className='dark:text-stone-400 text-sm'>{movie.year}</span>
				</div>
			</div>
		</Link>

	);
};

export default MovieCardList;