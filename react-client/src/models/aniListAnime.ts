export interface AniListAnime{
    id: number
    title: {
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
}