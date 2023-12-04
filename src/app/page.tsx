import Link from 'next/link';
import { Movies, Root } from './interfaces/movies.interface';
import Image from 'next/image'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Star } from 'lucide-react';

async function getData() {
  console.log('Fatching...')
  const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1`, {
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

export default async function Home() {
  try {
    const data: Root = await getData();
    const movies: Movies[] = data.items;

    const MoviesArray = movies.map((movie) => {
      return (
        <div key={movie.kinopoiskId} className='dark:bg-zinc-900/50 p-5 border rounded-lg ease-in duration-200 hover:shadow-lg hover:scale-105'>
          <Link href={`/movie/${movie.kinopoiskId}`} passHref>
            <Image src={movie.posterUrl} width={300} height={500} alt="test" />
            <div className='pt-2'>
              <h3>{movie.nameRu}</h3>
              <span className='dark:text-stone-400 text-sm'>{movie.year}</span>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <main>
        <div className='container mt-5'>
          <Alert className='text-white bg-gradient-to-r from-violet-500 to-fuchsia-500'>
            <Star className="h-4 w-4" color='#fff' />
            <AlertTitle>ТОП 250 ФИЛЬМОВ</AlertTitle>
            <AlertDescription>
              Рейтинг составлен по результатам голосования посетителей сайта. Любой желающий может принять в нем участие, проголосовав за свой любимый фильм.
            </AlertDescription>
          </Alert>
          <div className='my-5 grid grid-cols-1 md:grid-cols-5 gap-5'>
            {MoviesArray}
          </div>
        </div>
      </main>
    );

  } catch (error) {
    return (
      <main>
        <div className='container'>
          <h1 className="text-4xl font-bold my-5">Main Page</h1>
          <h2>Fetch Error</h2>
        </div>
      </main>
    )
  }
}
