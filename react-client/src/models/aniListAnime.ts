export interface AniListAnime {
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
    status?: string
    averageScore?: number
    popularity?: string
    format?: string
    season?: string
    seasonYear?: number
    studios?: {
        edges: {
            node: {
                name: string
            },
            isMain: boolean
        }
    }
}