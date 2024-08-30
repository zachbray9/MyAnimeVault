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
            runInAction(() => this.userAnimeDetails = response)
            this.setIsLoadingUserAnimeDetails(false)
        } catch (error) {
            console.log('There was a problem getting the user anime details: ' + error)
            this.setIsLoadingUserAnimeDetails(false)
        }
    }

    setIsLoadingUserAnimeDetails = (value: boolean) => {
        this.isLoadingUserAnimeDetails = value
    }
}