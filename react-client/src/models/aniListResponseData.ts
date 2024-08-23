import { AniListAnime } from "./aniListAnime"

export interface AniListResponseData{
    data: {
        Page: {
            media: AniListAnime[]
        }
    }
}