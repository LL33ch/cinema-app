import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronDown, Clock, Flame, Heart, Skull, Star, TrendingUp, Users } from 'lucide-react';
import SelectCategoryProps from './SelectCategory.props';

const SelectCategory: React.FC<SelectCategoryProps> = ({ category }) => {
	let categoryIcon: React.ReactNode;

	switch (category) {
		case 'Популярные':
			categoryIcon = <TrendingUp className="mr-2 h-4 w-4 text-rose-600" />;
			break;
		case 'Топ 250 фильмов':
			categoryIcon = <Star className="mr-2 h-4 w-4 text-amber-500" />;
			break;
		case 'Топ 250 сериалов':
			categoryIcon = <Star className="mr-2 h-4 w-4 text-amber-500" />;
			break;
		case 'Скоро выходит':
			categoryIcon = <Clock className="mr-2 h-4 w-4 text-muted-foreground" />;
			break;
		case 'Семейные фильмы':
			categoryIcon = <Users className="mr-2 h-4 w-4 text-muted-foreground" />;
			break;
		case 'Фильмы про любовь':
			categoryIcon = <Heart className="mr-2 h-4 w-4 text-muted-foreground" />;
			break;
		case 'Фильмы про зомби':
			categoryIcon = <Skull className="mr-2 h-4 w-4 text-muted-foreground" />;
			break;
		case 'Фильмы про катастрофы':
			categoryIcon = <Flame className="mr-2 h-4 w-4 text-muted-foreground" />;
			break;
		default:
			return (<></>)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='text-base' variant="outline">{categoryIcon}{category}<ChevronDown className='ms-3 h-4 w-4 text-muted-foreground' /></Button>
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