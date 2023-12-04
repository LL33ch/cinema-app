export interface Root {
	total: number
	totalPages: number
	items: Movies[]
}

export interface Movies {
	kinopoiskId: number
	imdbId?: string
	nameRu: string
	nameEn: any
	nameOriginal?: string
	countries: Country[]
	genres: Genre[]
	ratingKinopoisk: number
	ratingImdb: number
	year: number
	type: string
	posterUrl: string
	posterUrlPreview: string
}

export interface Country {
	country: string[]
}

export interface Genre {
	genre: string[]
}
