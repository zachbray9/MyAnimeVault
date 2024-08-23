import { makeAutoObservable, runInAction } from "mobx"
import { aniListAgent } from "../api/aniListAgent"
import { AniListAnime } from "../models/aniListAnime"

export default class AnimeStore {
    featuredShows: AniListAnime[] = []
    topAiringShows: AniListAnime[] = []
    popularShows: AniListAnime[] = []
    upcomingShows: AniListAnime[] = []
    isLoadingFeaturedShows: boolean = false
    isLoadingTopAiringShows: boolean = false
    isLoadingPopularShows: boolean = false
    isLoadingUpcomingShows: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadFeaturedShows = async () => {
        this.setIsLoadingFeaturedShows(true)

        const query = {
            query: `
            query {
                Page(perPage: 5) {
                    media(sort: TRENDING_DESC, type: ANIME, status: RELEASING) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                        bannerImage
                        description
                        episodes
                        trending
                    }
                }
            }
        `,
        }

        try {
            const response = await aniListAgent.AnimeData.getTrending(query)
            console.log(response)
            runInAction(() => this.featuredShows = response.data.Page.media)
            this.setIsLoadingFeaturedShows(false)
        } catch (error) {
            console.log("Couldn't load the featured shows: " + error)
            this.setIsLoadingFeaturedShows(false)
        }
    }

    loadTopAiringShows = async () => {
        this.setIsLoadingTopAiringShows(true)

        const query = {
            query: `
            query {
                Page(perPage: 20) {
                    media(sort: POPULARITY_DESC, type: ANIME, status: RELEASING) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                        bannerImage
                        description
                        episodes
                        trending
                    }
                }
            }
        `,
        }

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

        const query = {
            query: `
            query {
                Page(perPage: 20) {
                    media(sort: POPULARITY_DESC, type: ANIME) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                        bannerImage
                        description
                        episodes
                        trending
                    }
                }
            }
        `,
        }

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

        const query = {
            query: `
            query {
                Page(perPage: 20) {
                    media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                        bannerImage
                        description
                        episodes
                        trending
                    }
                }
            }
        `,
        }

        try {
            const response = await aniListAgent.AnimeData.getUpcoming(query)
            runInAction(() => this.upcomingShows = response.data.Page.media)
            this.setIsLoadingUpcomingShows(false)
        } catch (error) {
            console.log("Couldn't load upcoming shows: " + error)
            this.setIsLoadingUpcomingShows(false)
        }
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
}
