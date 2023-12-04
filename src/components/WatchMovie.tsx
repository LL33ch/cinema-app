"use client"
import React, { useState, useEffect } from 'react';

interface WatchMovieProps {
	id: number; // Замените number на подходящий тип вашего id
}

const WatchMovie: React.FC<WatchMovieProps> = (props) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleKeyPress = (event: KeyboardEvent) => {
		// Проверяем, нажаты ли нужные клавиши (например, Ctrl + Shift + F)
		if (event.ctrlKey && event.shiftKey && event.key === 'F') {
			setIsVisible(!isVisible);
		}
	};

	useEffect(() => {
		// Добавляем обработчик событий при монтировании компонента
		document.addEventListener('keydown', handleKeyPress);

		// Убираем обработчик событий при размонтировании компонента
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []); // Пустой массив зависимостей, чтобы использовать useEffect только при монтировании

	return (
		<div>
			{isVisible &&
				<div className="container mt-5 p-5 backdrop-blur-2xl bg-white/25 dark:bg-zinc-900/50 border rounded-lg">
					<iframe src={`//06796622434375553.svetacdn.in/EARWdntqzBEw?kp_id=${props.id}`} width="100%" height="700px" frameBorder="0" allowFullScreen></iframe>
				</div>}
		</div>
	);
};

export default WatchMovie;
