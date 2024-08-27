import { makeAutoObservable, runInAction } from "mobx"
import { aniListAgent } from "../api/aniListAgent"
import { AniListAnime } from "../models/aniListAnime"
import { debounce } from "lodash"
import { LoadSearchResultsQuery } from "../api/queries/loadSearchResultsQuery"
import { LoadAnimeDetailsQuery } from "../api/queries/animeDetailsQuery"
import { LoadUpcomingShowsQuery } from "../api/queries/upcomingShowsQuery"
import { LoadPopularShowsQuery } from "../api/queries/popularShowsQuery"
import { TopAiringShowsQuery } from "../api/queries/topAiringShowsQuery"
import { FeaturedShowsQuery } from "../api/queries/featuredShowsQuery"

export default class AnimeStore {
    selectedAnime: AniListAnime | null = null
    featuredShows: AniListAnime[] = []
    topAiringShows: AniListAnime[] = []
    popularShows: AniListAnime[] = []
    upcomingShows: AniListAnime[] = []
    searchResults: AniListAnime[] = []
    isLoadingSelectedAnime: boolean = false
    isLoadingFeaturedShows: boolean = false
    isLoadingTopAiringShows: boolean = false
    isLoadingPopularShows: boolean = false
    isLoadingUpcomingShows: boolean = false
    isLoadingSearchResults: boolean = false

    constructor() {
        makeAutoObservable(this)
        // this.loadSearchResults = debounce(this.loadSearchResults, 1000)
    }

    loadFeaturedShows = async () => {
        this.setIsLoadingFeaturedShows(true)

        const query = FeaturedShowsQuery()

        try {
            const response = await aniListAgent.AnimeData.getTrending(query)
            runInAction(() => this.featuredShows = response.data.Page.media.filter(anime => anime.bannerImage))
            this.setIsLoadingFeaturedShows(false)
        } catch (error) {
            console.log("Couldn't load the featured shows: " + error)
            this.setIsLoadingFeaturedShows(false)
        }
    }

    loadTopAiringShows = async () => {
        this.setIsLoadingTopAiringShows(true)

        const query = TopAiringShowsQuery()

        try {
            const response = await aniListAgent.AnimeData.getTopAiring(query)
            runInAction(() => this.topAiringShows = response.data.Page.media)
            this.setIsLoadingTopAiringShows(false)
        } catch (error) {
            console.log("Couldn't load top airing shows: " + error)
            this.setIsLoadingTopAiringShows(false)
        }
    }

    loadPopularShows = async () => {
        this.setIsLoadingPopularShows(true)

        const query = LoadPopularShowsQuery()

        try {
            const response = await aniListAgent.AnimeData.getPopular(query)
            runInAction(() => this.popularShows = response.data.Page.media)
            this.setIsLoadingPopularShows(false)
        } catch (error) {
            console.log("Couldn't load popular shows: " + error)
            this.setIsLoadingPopularShows(false)
        }
    }

    loadUpcomingShows = async () => {
        this.setIsLoadingUpcomingShows(true)

        const query = LoadUpcomingShowsQuery()

        try {
            const response = await aniListAgent.AnimeData.getUpcoming(query)
            runInAction(() => this.upcomingShows = response.data.Page.media)
            this.setIsLoadingUpcomingShows(false)
        } catch (error) {
            console.log("Couldn't load upcoming shows: " + error)
            this.setIsLoadingUpcomingShows(false)
        }
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

    loadSearchResults = debounce( async (searchQuery: string) => {
        this.setIsLoadingSearchResults(true)

        if(!searchQuery){
            this.clearSearchResults()
            return
        }

        const query = LoadSearchResultsQuery(searchQuery)

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
        this.searchResults = []
    }

    setIsLoadingSelectedAnime = (value: boolean) => {
        this.isLoadingSelectedAnime = value
    }

    setIsLoadingFeaturedShows = (value: boolean) => {
        this.isLoadingFeaturedShows = value
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

    setIsLoadingSearchResults = (value: boolean) => {
        this.isLoadingSearchResults = value
    }
}
