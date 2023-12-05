import Link from 'next/link';
import { Movies, Root } from './interfaces/movies.interface';
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Film, Star, Dot } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import KinopoiskIcon from '/public/kinopoisk.svg';
import ImdbIcon from '/public/imdb.svg';
import { Badge } from '@/components/ui/badge';

async function getData() {
  console.log('Fatching...')
  const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1`, {
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

const navbarLinks = [
  {
    id: 1,
    href: "/top250",
    label: (
      <Button variant="link" className='w-full justify-start'>
        <Star className="mr-2 h-4 w-4" /> Топ 250
      </Button>),
  },
  {
    id: 2,
    href: "/movies",
    label: (
      <Button variant="link" className='w-full justify-start'>
        <Film className="mr-2 h-4 w-4" /> Популярные фильмы
      </Button>),
  },
  {
    id: 3,
    href: "/serials",
    label: (<Button variant="link" className='w-full justify-start'>
      <Film className="mr-2 h-4 w-4" /> Семейные
    </Button>)
  },
  {
    id: 4,
    href: "/movies-love",
    label: (<Button variant="link" className='w-full justify-start'>
      <Film className="mr-2 h-4 w-4" /> Фильмы про любовь
    </Button>)
  },
  {
    id: 5,
    href: "/movies-catastrophe",
    label: (<Button variant="link" className='w-full justify-start'>
      <Film className="mr-2 h-4 w-4" /> Фильмы-катастрофы
    </Button>)
  }
];

const Navbar = () => {
  return (
    <div className='grid gap-2'>
      {navbarLinks.map((item) => (
        <Link key={item.id} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};


function getRatingColorClass(rating: number) {
  switch (true) {
    case rating >= 8:
      return 'fill-amber-300 text-amber-500 dark:text-amber-300';
    case rating > 7:
      return 'fill-green-500 text-green-700 dark:text-green-500';
    case rating <= 7:
      return 'fill-stone-400 text-stone-600 dark:text-stone-400';
    default:
      return 'fill-stone-400 text-stone-600 dark:text-stone-400';
  }
}


export default async function Home() {
  try {
    const data: Root = await getData();
    const movies: Movies[] = data.items;

    const MoviesArray = movies.map((movie) => {
      return (
        <div key={movie.kinopoiskId} className='dark:bg-zinc-900/50 p-5 border rounded-lg transition duration-150 ease-in-out hover:shadow-lg'>
          <Link href={`/movie/${movie.kinopoiskId}`} passHref>
            <div className='grid grid-cols-[auto_1fr_auto] gap-5'>
              <Image src={movie.posterUrl} width={72} height={108} alt={movie.nameRu} />
              <div>
                <h2 className='font-bold text-xl'>{movie.nameRu}</h2>
                <h3 className='text-sm mt-2'>{movie.nameOriginal ? `${movie.nameOriginal},` : ''} {movie.year}</h3>
                <h3 className='flex text-stone-400 text-sm mt-2'>{movie.countries.map(Сountry => Сountry.country).join(', ')}<Dot />{movie.genres.map(Genre => Genre.genre).join(', ')}</h3>
              </div>
              <div className='justify-self-end'>
                <span className={`text-base ${getRatingColorClass(movie.ratingKinopoisk)}`}>{movie.ratingKinopoisk}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <main>
        <div className='container flex-1 items-start my-5 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-3 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-5'>
          <div>
            <ScrollArea className="h-full w-full rounded-lg border p-2 mb-3">
              <Navbar />
            </ScrollArea>
          </div>
          <div>
            <div className='grid grid-cols-1 gap-5'>
              {MoviesArray}
            </div>
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
