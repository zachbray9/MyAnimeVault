import { makeAutoObservable, runInAction } from "mobx";
import { AniListAnime } from "../models/aniListAnime";
import { UserAnimeDetails } from "../models/userAnimeDetails";
import { myApiAgent } from "../api/myApiAgent";
import { UserAnimePatchRequest } from "../models/requests/userAnimePatchRequest";
import { store } from "./store";

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
            this.setIsLoadingUserAnimeDetails(false)
        } catch (error) {
            console.log('There was a problem getting the user anime details: ' + error)
            this.setIsLoadingUserAnimeDetails(false)
        }
    }

    setUserAnimeDetails = (userAnimeDetails: UserAnimeDetails) => {
        this.userAnimeDetails = userAnimeDetails
    }

    updateUserAnime = async (rating?: number, watchStatus?: string, numEpisodesWatched?: number) => {
        const animeId = store.animeStore.selectedAnime!.id
        console.log(typeof(rating))

        const patchRequest: Partial<UserAnimePatchRequest> = {
            ...(rating != undefined && {rating}),
            ...(watchStatus != undefined && {watchStatus}),
            ...(numEpisodesWatched != undefined && {numEpisodesWatched})
        }

        console.log(patchRequest)
        await myApiAgent.List.updateUserAnime(animeId, patchRequest)
        console.log("successfully updated useranime")
    }

    setIsLoadingUserAnimeDetails = (value: boolean) => {
        this.isLoadingUserAnimeDetails = value
    }

    clearUserAnimeDetails = () => {
        this.userAnimeDetails = null
    }
}