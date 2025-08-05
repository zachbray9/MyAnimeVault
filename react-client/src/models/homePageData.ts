import { AniListAnime } from "./aniListAnime"

export default interface HomePageData {
    data: {
        featured: {
            media: AniListAnime[]
        },
        trending: {
            media: AniListAnime[]
        },
        popular: {
            media: AniListAnime[]
        },
        upcoming: {
            media: AniListAnime[]
        }
    }
}