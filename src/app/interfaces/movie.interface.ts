export interface Movie {
	kinopoiskId: number
	kinopoiskHDId: string
	imdbId: any
	nameRu: string
	nameEn: any
	nameOriginal: string
	posterUrl: string
	posterUrlPreview: string
	coverUrl: string
	logoUrl: any
	reviewsCount: number
	ratingGoodReview: any
	ratingGoodReviewVoteCount: number
	ratingKinopoisk: any
	ratingKinopoiskVoteCount: number
	ratingImdb: number
	ratingImdbVoteCount: number
	ratingFilmCritics: any
	ratingFilmCriticsVoteCount: number
	ratingAwait: any
	ratingAwaitCount: number
	ratingRfCritics: any
	ratingRfCriticsVoteCount: number
	webUrl: string
	year: number
	filmLength: number
	slogan: any
	description: string
	shortDescription: any
	editorAnnotation: any
	isTicketsAvailable: boolean
	productionStatus: any
	type: string
	ratingMpaa: any
	ratingAgeLimits: string
	countries: Country[]
	genres: Genre[]
	startYear: any
	endYear: any
	serial: boolean
	shortFilm: boolean
	completed: boolean
	hasImax: boolean
	has3D: boolean
	lastSync: string
}

export interface MovieHDVB {
	title_ru: string
	title_en: string
	year: number
	kinopoisk_id: number
	world_art_id: any
	translator: string
	token: string
	type: string
	iframe_url: string
	added_date: string
	update_date: string
	block: boolean
	translator_id: number
	quality: string
	poster: string
	trailer: string
	genres: any
	countries: any
	actors: any
	directors: any
}

export interface Country {
	country: string[]
}

export interface Genre {
	genre: string[]
}
