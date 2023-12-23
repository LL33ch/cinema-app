import { useEffect, useMemo, useState } from 'react';

export function useMediaQuery(query: string) {
	const isClient = typeof window === 'object'; // Check if window is defined

	const mediaQuery = useMemo(() => isClient ? window.matchMedia(query) : null, [isClient, query]);
	const [match, setMatch] = useState(isClient && mediaQuery ? mediaQuery.matches : false);

	useEffect(() => {
		if (!isClient || !mediaQuery) {
			return;
		}

		const handleChange = () => {
			setMatch(mediaQuery.matches);
		};

		mediaQuery.addListener(handleChange);

		return () => {
			mediaQuery.removeListener(handleChange);
		};
	}, [isClient, mediaQuery]);

	return match;
}
