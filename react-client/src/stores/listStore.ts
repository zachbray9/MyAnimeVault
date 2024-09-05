import { makeAutoObservable, runInAction } from "mobx";
import { UserAnimeDetails } from "../models/userAnimeDetails";
import { myApiAgent } from "../api/myApiAgent";
import { UserAnimePatchRequest } from "../models/requests/userAnimePatchRequest";
import { store } from "./store";

export default class ListStore {
    list: UserAnimeDetails[] | null = []
    userAnimeDetails: UserAnimeDetails | null = null
    isLoadingUserAnimeDetails: boolean = false
    isLoadingList: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadList = async () => {
        this.setIsLoadingList(true)

        try {
            const response = await myApiAgent.List.getList()
            runInAction(() => this.list = response.animeList)
            console.log("Successfully loaded list.")
            this.setIsLoadingList(false)
        } catch (error) {
            console.log(error)
            this.setIsLoadingList(false)
        }
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
        console.log(typeof (rating))

        const patchRequest: Partial<UserAnimePatchRequest> = {
            ...(rating != undefined && { rating }),
            ...(watchStatus != undefined && { watchStatus }),
            ...(numEpisodesWatched != undefined && { numEpisodesWatched })
        }

        console.log(patchRequest)
        await myApiAgent.List.updateUserAnime(animeId, patchRequest)
        console.log("successfully updated useranime")
    }

    setIsLoadingList = (value: boolean) => {
        this.isLoadingList = value
    }

    setIsLoadingUserAnimeDetails = (value: boolean) => {
        this.isLoadingUserAnimeDetails = value
    }

    clearList = () => {
        this.list = []
    }

    clearUserAnimeDetails = () => {
        this.userAnimeDetails = null
    }
}