// Клиентский компонент

"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MonitorPlay } from 'lucide-react';

interface WatchMovieProps {
	id?: number;
}

const WatchMovie: React.FC<WatchMovieProps> = ({ id }) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div>
			{isVisible && (
				<div className="container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg">
					<iframe
						src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${id}`}
						width="100%"
						height="700px"
						frameBorder="0"
						allowFullScreen
					></iframe>
				</div>
			)}
		</div>
	);
};

export default WatchMovie;
