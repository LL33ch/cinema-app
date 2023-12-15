import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

export default function LoadingMoviePage() {
	return (
		<div className="container p-5 bg-white/25 dark:bg-zinc-900/80 border rounded-lg backdrop-blur-xl">
			<div className='grid md:grid-cols-[1fr,2fr,auto] sm:grid-cols-[auto] gap-0 sm:gap-10 mb-5'>
				<div className='relative'>
					<Skeleton className="w-[400px] h-[600px]" />
					<div className='block sm:hidden absolute bottom-0 bg-gradient-to-t from-black via-black/70 p-3 pt-10 rounded w-full'>
						<h1 className="text-4xl font-bold"><Skeleton className="w-auto h-[40px]" /></h1>
						<h3 className='my-3 text-stone-400'><Skeleton className="w-auto h-[24px]" /></h3>
					</div>
				</div>
				<div>
					<div className='hidden sm:block'>
						<h1 className="text-3xl text-white font-bold"><Skeleton className="w-[390px] h-[40px]" /></h1>
						<h3 className='mt-3 text-stone-400'><Skeleton className="w-[100px] h-[24px]" /></h3>
					</div>
					<h4 className='dark:text-stone-300 mt-3'><Skeleton className="w-[390px] h-[40px]" /></h4>
					<h2 className='my-3 font-medium'><h3 className='mt-3 text-stone-400'><Skeleton className="w-[100px] h-[20px]" /></h3></h2>
					<Table className='hidden sm:block'>
						<TableBody>
							<TableRow>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
								<TableCell><Skeleton className="w-[260px] h-[40px]" /></TableCell>
							</TableRow>
						</TableBody>
					</Table>

				</div>
			</div>
			<Separator className="my-4" />
			<p><Skeleton className="w-full h-[70px]" /></p>
		</div>
	);
};