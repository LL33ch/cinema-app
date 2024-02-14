import Link from 'next/link';

const currentYear = new Date().getFullYear();

export default function Footer() {

	return (
		<footer className="bg-white shadow dark:bg-zinc-900/70">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} Cinema-APP by MrR504. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<Link href="https://github.com/MrR504/cinema-app" target='_blank' className="hover:underline me-4 md:me-6">Github</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};