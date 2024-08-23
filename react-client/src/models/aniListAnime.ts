export interface AniListAnime{
    id: number
    title: {
        romaji?: string
        english?: string
        native?: string
    }
    coverImage: {
        large?: string
        medium?: string
        small?: string
    }
    bannerImage?: string
    description?: string
    episodes?: number
    genres?: string[]
}