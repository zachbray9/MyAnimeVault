import { makeAutoObservable, runInAction } from "mobx"
import { aniListAgent } from "../api/aniListAgent"
import { AniListAnime } from "../models/aniListAnime"
import { debounce } from "lodash"
import { LoadSearchResultsQuery } from "../api/queries/loadSearchResultsQuery"
import { LoadAnimeDetailsQuery } from "../api/queries/animeDetailsQuery"
import { CategoryQuery } from "../api/queries/categoryQuery"

export default class AnimeStore {
    selectedAnime: AniListAnime | null = null
    searchQuery: string = ''
    searchResults: AniListAnime[] = []
    isLoadingSelectedAnime: boolean = false
    isLoadingSearchResults: boolean = false

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

    loadSearchResults = debounce(async () => {
        this.setIsLoadingSearchResults(true)

        if (!this.searchResults) {
            this.clearSearchResults()
            return
        }

        const query = LoadSearchResultsQuery(this.searchQuery)

        try {
            const response = await aniListAgent.AnimeData.getSearchResults(query)
            runInAction(() => this.searchResults = response.data.Page.media)
            this.setIsLoadingSearchResults(false)
        } catch (error) {
            console.log("Could not load search results: " + error)
            this.setIsLoadingSearchResults(false)
        }
    }, 500)

    clearSelectedAnime = () => {
        this.selectedAnime = null
    }

    clearSearchResults = () => {
        this.searchQuery = ''
        this.searchResults = []
    }

    setSearchQuery = (value: string) => {
        this.searchQuery = value
    }

    setIsLoadingSelectedAnime = (value: boolean) => {
        this.isLoadingSelectedAnime = value
    }

    setIsLoadingSearchResults = (value: boolean) => {
        this.isLoadingSearchResults = value
    }
}
