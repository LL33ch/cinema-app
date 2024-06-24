import { Movie, MovieHDVB } from '@/app/interfaces/movie.interface';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import KinopoiskIcon from '/public/kinopoisk.svg';
import ImdbIcon from '/public/imdb.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Movies } from '@/app/interfaces/similar-movies.interface';
import { WatchMovieButton, WatchMovieIframe } from '@/components/WatchMovie/WatchMovie';
import { Metadata } from 'next';
import { getMovie, getSimilarMovies } from '@/app/api/api';
import Trailer from '@/components/MovieTrailer';
import BookmarkButton from '@/components/Bookmark/BookmarkButton';

export async function generateMetadata({
  params,
}: {
  params: { kp_id: number };
}): Promise<Metadata> {
  const kp_id = params.kp_id;
  const MovieData = await getMovie(kp_id);
  const movie: Movie = MovieData.movie;
  return {
    title: `${movie.nameRu} ${movie.nameOriginal ? `/ ${movie.nameOriginal}` : ''} (${movie.year})`,
  };
}

function getRatingColorClass(rating: number) {
  switch (true) {
    case rating >= 8:
      return 'fill-amber-500 text-amber-500 bg-amber-500/25 hover:bg-amber-500/30';
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
    const movie: Movie = MovieData.movie;
    const MovieHDVB: MovieHDVB = MovieData.movieHDVB[0];

    const SimilarMoviesData = await getSimilarMovies(kp_id);
    const movies: Movies[] = SimilarMoviesData.items;
    const limitedMovies = movies.slice(0, 5);

    const SimilarMoviesArray = limitedMovies.map((movie) => {
      return (
        <Link key={movie.filmId} href={`/movie/${movie.filmId}`} passHref>
          <div className='dark:bg-zinc-900/50 hover:border-zinc-600 hover:shadow-lg p-4 border rounded-lg ease-in duration-200'>
            <Image
              className='rounded-lg object-cover transition-all hover:scale-105 aspect-[3/4]'
              src={movie.posterUrl}
              width={500}
              height={700}
              alt={movie.nameRu}
            />
          </div>
        </Link>
      );
    });

    return (
      <>
        <div
          className='fixed inset-0 -z-10 blur opacity-0 dark:opacity-20 bg-cover'
          style={{ backgroundImage: `url(${movie.coverUrl})` }}
        />
        <div className='container p-5 bg-white/25 dark:bg-zinc-900/80 border rounded-lg backdrop-blur-xl'>
          <div className='grid md:grid-cols-[1fr,2fr,auto] sm:grid-cols-[auto] gap-0 sm:gap-10 mb-5'>
            <div className='relative'>
              <Image
                className='rounded-lg'
                src={movie.posterUrl}
                width={400}
                height={600}
                alt={movie.nameOriginal}
                priority
              />
              <div className='block sm:hidden absolute bottom-0 bg-gradient-to-t from-black via-black/70 p-3 pt-10 rounded w-full'>
                <h1 className='text-3xl text-white font-bold'>
                  {movie.nameRu} {movie.year && `(${movie.year})`}
                </h1>
                <h3 className='mt-3 text-stone-400'>{movie.nameOriginal}</h3>
              </div>
            </div>
            <div>
              <div className='hidden sm:block'>
                <h1 className='text-4xl font-bold'>
                  {movie.nameRu} {movie.year && `(${movie.year})`}
                </h1>
                <h3 className='mt-3 text-stone-400'>{movie.nameOriginal}</h3>
              </div>
              <WatchMovieButton />
              {MovieHDVB && MovieHDVB.trailer && (
                <Trailer trailer={MovieHDVB.trailer} MovieTitle={movie.nameRu} />
              )}
              <BookmarkButton movie={movie} />
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
                    <TableCell>
                      {movie.countries.map((Сountry) => Сountry.country).join(', ')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Жанры:</TableCell>
                    <TableCell>{movie.genres.map((Genre) => Genre.genre).join(', ')}</TableCell>
                  </TableRow>
                  {movie.slogan != null && (
                    <TableRow>
                      <TableCell>Слоган:</TableCell>
                      <TableCell>
                        <span className='dark:text-stone-300 italic'>«{movie.slogan}»</span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {(movie.ratingKinopoisk || movie.ratingImdb) && (
              <div>
                <div className='inline-flex'>
                  {movie.ratingKinopoisk && (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            className={`text-xl me-2 ${getRatingColorClass(movie.ratingKinopoisk)}`}
                          >
                            <KinopoiskIcon className='me-2' />
                            {movie.ratingKinopoisk}
                          </Badge>
                          <TooltipContent>
                            Рейтинг КиноПоиск: {movie.ratingKinopoisk}
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {movie.ratingImdb && (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className='text-xl  text-stone-400 bg-stone-400/25 hover:bg-stone-400/30'>
                            <ImdbIcon className='me-2 fill-stone-400' />
                            {movie.ratingImdb}
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
          <Separator className='my-4' />
          <p>{movie.description}</p>
        </div>
        {MovieHDVB && MovieHDVB.iframe_url && (
          <WatchMovieIframe IframeSrc={MovieHDVB.iframe_url} kp_id={movie.kinopoiskId} />
        )}
        {SimilarMoviesArray.length > 0 && (
          <div className='container mt-5 p-5 backdrop-blur-xl bg-white/25 dark:bg-zinc-900/80 border rounded-lg'>
            <h2 className='text-lg mb-5 font-medium'>Похожие фильмы</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>{SimilarMoviesArray}</div>
          </div>
        )}
      </>
    );
  } catch (error) {
    return;
  }
}
