import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { Button } from './ui/button';
import { Clock, Flame, Heart, Skull, Star, TrendingUp, Users } from 'lucide-react';

interface SelectCategoryProps {
	category: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ category }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='center' asChild>
				<Button className='texlt-lg mb-3' variant="outline">{category}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Link href="/"><DropdownMenuItem><TrendingUp className="mr-2 h-4 w-4 text-rose-600" />Популярные</DropdownMenuItem></Link>
				<Link href="/collections/top250-movies"><DropdownMenuItem><Star className="mr-2 h-4 w-4 text-amber-500" />Топ 250 фильмов</DropdownMenuItem></Link>
				<Link href="/collections/top250-serials"><DropdownMenuItem><Star className="mr-2 h-4 w-4 text-amber-500" />Топ 250 сериалов</DropdownMenuItem></Link>
				<DropdownMenuSeparator />
				<Link href="/collections/closes-release"><DropdownMenuItem><Clock className="mr-2 h-4 w-4 text-muted-foreground" />Скоро выходит</DropdownMenuItem></Link>
				<Link href="/collections/family"><DropdownMenuItem><Users className="mr-2 h-4 w-4 text-muted-foreground" />Семейные фильмы</DropdownMenuItem></Link>
				<Link href="/collections/love"><DropdownMenuItem><Heart className="mr-2 h-4 w-4 text-muted-foreground" />Фильмы про любовь</DropdownMenuItem></Link>
				<Link href="/collections/zombie"><DropdownMenuItem><Skull className="mr-2 h-4 w-4 text-muted-foreground" />Фильмы про зомби</DropdownMenuItem></Link>
				<Link href="/collections/catastrophe"><DropdownMenuItem><Flame className="mr-2 h-4 w-4 text-muted-foreground" />Фильмы про катастрофы</DropdownMenuItem></Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SelectCategory;