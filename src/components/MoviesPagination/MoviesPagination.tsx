import { Movies, Root } from '@/app/interfaces/movies.interface';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, buttonVariants } from '../ui/button';

const itemsPerPage = 20; // Количество элементов на странице

export interface MoviePaginationProps {
	data: Root;
	totalPagesData: number;
	currentPageData: number;
}

const MoviePagination = ({ data, totalPagesData, currentPageData }: MoviePaginationProps) => {
	const [currentPage, setCurrentPage] = useState(currentPageData);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setTotalPages(totalPagesData);
	}, [totalPagesData]);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<div className="flex items-center justify-between border-t px-4 mt-3 py-3 sm:px-6 dark:bg-zinc-900/50 border rounded">
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-stone-400">
						Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
						<span className="font-medium">{Math.min(currentPage * itemsPerPage, data.total)}</span> of{' '}
						<span className="font-medium">{data.total}</span> results
					</p>
				</div>
				<div>
					<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<Button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
							<span className="sr-only">Previous</span>
						</Button>
						{Array.from({ length: totalPages }, (_, index) => (
							<Link key={index + 1} href={`/?page=${index + 1}`} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === (index + 1)
								? buttonVariants({})
								: buttonVariants({ variant: "outline" })
								}`} onClick={() => handlePageChange(index + 1)}>
								{index + 1}
							</Link>
						))}
						<Button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
							<span className="sr-only">Next</span>
						</Button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MoviePagination;
