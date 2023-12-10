import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Youtube } from 'lucide-react';

interface TrailerProps {
	MovieTitle: string;
	trailer: string;
}


export default function Trailer({ MovieTitle, trailer }: TrailerProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className="ms-2"><Youtube className="mr-2 h-4 w-4" />Трейлер</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[1000px]">
				<DialogHeader>
					<DialogTitle>Трейлер: {MovieTitle}</DialogTitle>
				</DialogHeader>
				{trailer ? (<iframe className="aspect-video mb-3 w-full" src={trailer}></iframe>) : null}
			</DialogContent>
		</Dialog>
	);
};