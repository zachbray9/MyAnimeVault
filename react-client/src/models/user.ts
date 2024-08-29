import { AniListAnime } from "./aniListAnime"

export interface User{
    Id: string
    Email: string
    DateJoined: Date
    AuthToken: string
    AnimeList: AniListAnime[]
}