export interface Anime{
    mal_id: number,
    images: {
        webp: {
            image_url: string | null,
            small_image_url: string | null,
            large_image_url: string | null
        }
    },
    trailer: {
        youtube_id: string | null,
        url: string | null,
        embed_url: string | null
    },
    titles: {
        type: string,
        title: string
    }[],
    type: string | null,
    episodes: number | null,
    status: string | null,
    rating: string | null,
    score: number | null,
    rank: number | null,
    popularity: number | null
    synopsis: string | null,
    season: string | null,
    year: number | null,
    studios: {
        name: string
    }[]
}