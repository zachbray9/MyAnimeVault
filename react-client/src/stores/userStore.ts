import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { LoginRequest } from "../models/requests/loginRequest";
import { myApiAgent } from "../api/myApiAgent";
import { store } from "./store";
import { RegisterRequest } from "../models/requests/registerRequest";
import { AniListAnime } from "../models/aniListAnime";
import router from "../router/routes";

export default class UserStore {
    user: User | null = null
    isAddingAnimeToList: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    login = async (values: LoginRequest) => {
        const response = await myApiAgent.Auth.login(values)
        store.commonStore.setAuthToken(response.user.authToken)
        runInAction(() => this.user = response.user)
        router.navigate('/')
    }

    register = async (values: RegisterRequest) => {
        const response = await myApiAgent.Auth.register(values)
        store.commonStore.setAuthToken(response.user.authToken)
        runInAction(() => this.user = response.user)
        router.navigate('/')
    }

    logout = () => {
        store.commonStore.setAuthToken(null)
        this.user = null
        router.navigate('/')
    }

    getCurrentUser = async (navigate: (path: string) => void) => {
        try {
            const response = await myApiAgent.Auth.getCurrentUser()
            store.commonStore.setAuthToken(response.user.authToken)
            runInAction(() => this.user = response.user)
            navigate('/')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    addAnimeToList = async (anime: AniListAnime) => {
        this.setIsAddingAnimeToList(true)

        console.log(anime)
        await myApiAgent.List.add(anime)
        runInAction(() => this.user?.animeIds.push(anime.id))
        store.listStore.setUserAnimeDetails({
            rating: 0,
            watchStatus: 'Plan to Watch',
            numEpisodesWatched: 0
        })

        this.setIsAddingAnimeToList(false)
    }

    setIsAddingAnimeToList = (value: boolean) => {
        this.isAddingAnimeToList = value
    }
}