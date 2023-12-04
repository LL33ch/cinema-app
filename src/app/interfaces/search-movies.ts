export interface Root {
  keyword: string
  pagesCount: number
  films: Movie[]
  searchFilmsCountResult: number
}

export interface Movie {
  filmId: number
  nameRu: string
  nameEn?: string
  type: string
  year: string
  description?: string
  filmLength: string
  countries: Country[]
  genres: Genre[]
  rating: string
  ratingVoteCount: number
  posterUrl: string
  posterUrlPreview: string
}

export interface Country {
  country: string[]
}

export interface Genre {
  genre: string[]
}
