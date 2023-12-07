"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';
interface WatchMovieProps {
	element: 'button' | 'iframe';
	MovieId: number;
}


const WatchMovie: React.FC<WatchMovieProps> = ({ MovieId, element }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<>
			{element === 'button' && (
				<Button className='my-5' onClick={() => setIsVisible(true)}>
					<MonitorPlay className="mr-2 h-4 w-4" /> Смотреть
				</Button>
			)}
			{element === 'iframe' && (
				<div className={`${isVisible ? 'block' : 'hidden'} container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg`}>
					<iframe
						src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${MovieId}`}
						width="100%"
						height="700px"
						allowFullScreen
					></iframe>
				</div>
			)}
		</>
	);
};

export default WatchMovie;
