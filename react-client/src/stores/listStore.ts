import { makeAutoObservable, runInAction } from "mobx";
import { AniListAnime } from "../models/aniListAnime";
import { UserAnimeDetails } from "../models/userAnimeDetails";
import { myApiAgent } from "../api/myApiAgent";

export default class ListStore {
    list: AniListAnime[] | null = null
    userAnimeDetails: UserAnimeDetails | null = null
    isLoadingUserAnimeDetails: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadUserAnimeDetails = async (animeId: number) => {
        this.setIsLoadingUserAnimeDetails(true)

        try {
            const response = await myApiAgent.List.getUserAnimeDetails(animeId)
            runInAction(() => this.userAnimeDetails = response.userAnime)
            console.log(this.userAnimeDetails?.rating)
            console.log(this.userAnimeDetails?.watchStatus)
            console.log(this.userAnimeDetails?.numEpisodesWatched)
            this.setIsLoadingUserAnimeDetails(false)
        } catch (error) {
            console.log('There was a problem getting the user anime details: ' + error)
            this.setIsLoadingUserAnimeDetails(false)
        }
    }

    setUserAnimeDetails = (userAnimeDetails: UserAnimeDetails) => {
        this.userAnimeDetails = userAnimeDetails
    }

    setIsLoadingUserAnimeDetails = (value: boolean) => {
        this.isLoadingUserAnimeDetails = value
    }

    clearUserAnimeDetails = () => {
        this.userAnimeDetails = null
    }
}