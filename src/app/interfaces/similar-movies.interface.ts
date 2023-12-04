export interface Root {
  total: number
  items: Movies[]
}

export interface Movies {
  filmId: number
  nameRu: string
  nameEn: string
  nameOriginal: string
  posterUrl: string
  posterUrlPreview: string
  relationType: string
}
