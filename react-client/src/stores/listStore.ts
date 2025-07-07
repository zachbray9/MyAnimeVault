import { makeAutoObservable, runInAction } from "mobx";
import { UserAnimeDetails } from "../models/userAnimeDetails";
import { myApiAgent } from "../api/myApiAgent";
import { UserAnimePatchRequest } from "../models/requests/userAnimePatchRequest";
import { store } from "./store";

export default class ListStore {
    list: UserAnimeDetails[] = []
    userAnimeDetails: UserAnimeDetails | null = null
    isLoadingUserAnimeDetails: boolean = false
    isLoadingList: boolean = false
    searchQuery: string = ''
    watchStatusFilter: string | null = null
    genresFilter: string[] = []
    sortPreference: string = 'title'

    constructor() {
        makeAutoObservable(this)
    }

    get filteredList() {
        let filteredList: UserAnimeDetails[] = this.list

        if(this.searchQuery) filteredList = filteredList.filter(userAnime => userAnime.title?.romaji?.toLowerCase().includes(this.searchQuery.toLowerCase()) || userAnime.title?.english?.toLowerCase().includes(this.searchQuery.toLowerCase()))

        if (this.watchStatusFilter) filteredList = filteredList.filter(userAnime => userAnime.watchStatus === this.watchStatusFilter)
        
        let sortedList: UserAnimeDetails[] = []
        if (this.sortPreference === 'title') sortedList = filteredList.slice().sort((a, b) => a.title!.romaji!.localeCompare(b.title!.romaji!))
        if (this.sortPreference === 'rating') sortedList = filteredList.slice().sort((a, b) => b.rating - a.rating)
        if (this.sortPreference === 'progress') sortedList = filteredList.slice().sort((a, b) => b.numEpisodesWatched - a.numEpisodesWatched)

        return sortedList
    }

    loadList = async () => {
        this.setIsLoadingList(true)

        try {
            const response = await myApiAgent.List.getList()
            this.list = response.animeList ?? []
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

    setSearchQuery = (query: string) => {
        this.searchQuery = query
    }

    setWatchStatusFilter = (watchStatusFilter: string | null) => {
        this.watchStatusFilter = watchStatusFilter
    }

    setGenresFilter = (genres: string[]) => {
        this.genresFilter = genres
    }

    setSortPreference = (sortPreference: string) => {
        this.sortPreference = sortPreference
    }

    clearList = () => {
        this.list = []
    }

    clearUserAnimeDetails = () => {
        this.userAnimeDetails = null
    }
}