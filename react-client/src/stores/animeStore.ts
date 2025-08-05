import { makeAutoObservable, runInAction } from "mobx"
import { aniListAgent } from "../api/aniListAgent"
import { AniListAnime } from "../models/aniListAnime"
import { LoadAnimeDetailsQuery } from "../api/queries/animeDetailsQuery"
import { CategoryQuery } from "../api/queries/categoryQuery"

export default class AnimeStore {
    selectedAnime: AniListAnime | null = null
    isLoadingSelectedAnime: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadAnimeDetails = async (animeId: number) => {
        this.setIsLoadingSelectedAnime(true)

        const query = LoadAnimeDetailsQuery(animeId)

        try {
            const response = await aniListAgent.AnimeData.getAnimeDetails(query)
            runInAction(() => this.selectedAnime = response.data.Media)
            this.setIsLoadingSelectedAnime(false)
        } catch (error) {
            console.log("Couldn't load selected anime: " + error)
            this.setIsLoadingSelectedAnime(false)
        }
    }

    loadAnimeCategory = async (genre: string | undefined, sortBy: string): Promise<AniListAnime[]> => {
        const query = CategoryQuery(genre, sortBy)

        try {
            const response = await aniListAgent.AnimeData.getCategory(query)
            return response.data.Page.media
        } catch (error) {
            console.log(error)
            return []
        }
    }

    clearSelectedAnime = () => {
        this.selectedAnime = null
    }

    setIsLoadingSelectedAnime = (value: boolean) => {
        this.isLoadingSelectedAnime = value
    }
}
