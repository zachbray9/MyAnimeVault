import { makeAutoObservable, runInAction } from "mobx"
import { Anime } from "../models/anime"
import { malAgent } from "../api/myAnimeListAgent"

export default class AnimeStore {
    topAiringShows: Anime[] = []
    isLoadingTopAiringShows: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadTopAiringShows = async () => {
        this.setIsLoadingTopAiringShows(true)

        try {
            const response = await malAgent.AnimeData.getTopAiring()
            runInAction(() => this.topAiringShows = response.data.map(anime => anime.node))
            this.setIsLoadingTopAiringShows(false)
        } catch (error) {
            console.log("Couldn't load top airing shows: " + error)
            this.setIsLoadingTopAiringShows(false)
        }


    }

    setIsLoadingTopAiringShows = (value: boolean) => {
        this.isLoadingTopAiringShows = value
    }
}
