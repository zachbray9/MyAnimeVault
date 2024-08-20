import { makeAutoObservable, runInAction } from "mobx"
import { Anime } from "../models/anime"
import { jikanAgent } from "../api/jikanAgent"

export default class AnimeStore {
    topAiringShows: Anime[] = []
    popularShows: Anime[] = []
    upcomingShows: Anime[] = []
    isLoadingTopAiringShows: boolean = false
    isLoadingPopularShows: boolean = false
    isLoadingUpcomingShows: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadTopAiringShows = async () => {
        this.setIsLoadingTopAiringShows(true)

        try {
            const response = await jikanAgent.AnimeData.getTopAiring()
            runInAction(() => this.topAiringShows = response.data)
            console.log(this.topAiringShows)
            this.setIsLoadingTopAiringShows(false)
        } catch (error) {
            console.log("Couldn't load top airing shows: " + error)
            this.setIsLoadingTopAiringShows(false)
        }
    }

    loadPopularShows = async () => {
        this.setIsLoadingPopularShows(true)

        try {
            const response = await jikanAgent.AnimeData.getPopular()
            runInAction(() => this.popularShows = response.data)
            this.setIsLoadingPopularShows(false)
        } catch (error) {
            console.log("Couldn't load popular shows: " + error)
            this.setIsLoadingPopularShows(false)
        }
    }

    loadUpcomingShows = async () => {
        this.setIsLoadingUpcomingShows(true)

        try {
            const response = await jikanAgent.AnimeData.getUpcoming()
            runInAction(() => this.upcomingShows = response.data)
            this.setIsLoadingUpcomingShows(false)
        } catch (error) {
            console.log("Couldn't load upcoming shows: " + error)
            this.setIsLoadingUpcomingShows(false)
        }
    }

    setIsLoadingTopAiringShows = (value: boolean) => {
        this.isLoadingTopAiringShows = value
    }

    setIsLoadingPopularShows = (value: boolean) => {
        this.isLoadingPopularShows = value
    }

    setIsLoadingUpcomingShows = (value: boolean) => {
        this.isLoadingUpcomingShows = value
    }
}
