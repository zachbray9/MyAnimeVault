export interface UserAnimeDetails{
    rating: number
    watchStatus: string
    numEpisodesWatched: number
    id?: number
    title?: {
        english?: string
        romaji?: string
    }
    coverImage?:{
        large?: string
        medium?: string
    }
    format?: string
    season?: string
    seasonYear?: number
    episodes?: number
}