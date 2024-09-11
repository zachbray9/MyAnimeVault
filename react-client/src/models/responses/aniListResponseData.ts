import { AniListAnime } from "../aniListAnime"

export interface AniListResponseDataPaged{
    data: {
        Page: {
            media: AniListAnime[]
        }
    }
}

export interface AniListResponseDataSingle{
    data: {
        Media: AniListAnime
    }
}