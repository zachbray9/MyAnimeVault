import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { LoginRequest } from "../models/requests/loginRequest";
import { myApiAgent } from "../api/myApiAgent";
import { store } from "./store";
import { RegisterRequest } from "../models/requests/registerRequest";
import { AniListAnime } from "../models/aniListAnime";
import router from "../router/routes";
import { toaster } from "../components/ui/toaster";

export default class UserStore {
    user: User | null = null
    isAddingAnimeToList: boolean = false
    isRemovingAnimeFromList: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }

    login = async (values: LoginRequest) => {
        const response = await myApiAgent.Auth.login(values)
        runInAction(() => this.user = response.user)
        router.navigate('/')
    }

    register = async (values: RegisterRequest) => {
        const response = await myApiAgent.Auth.register(values)
        runInAction(() => this.user = response.user)
        router.navigate('/')
    }

    logout = async () => {
        try {
            await myApiAgent.Auth.logout()
        } catch (error) {
            console.log(error)
        }
        runInAction(() => this.user = null)
    }

    setUser = (user: User) => {
        this.user = user
    }

    clearUser = () => {
        this.user = null
    }

    addAnimeToList = async (anime: AniListAnime) => {
        if (!this.user) {
            router.navigate('/login')
            return
        }

        this.setIsAddingAnimeToList(true)

        try {
            await myApiAgent.List.add(anime)
            runInAction(() => this.user?.animeIds.push(anime.id))
            store.listStore.setUserAnimeDetails({
                rating: 5,
                watchStatus: 'watching',
                numEpisodesWatched: 0
            })

            this.setIsAddingAnimeToList(false)
        } catch (error) {
            console.log(error)
            toaster.create({
                title: 'Add failed!',
                description: 'Looks like we need to power up. Try again!',
                type: "error",
                duration: 7000,
                closable: true,
            })
            this.setIsAddingAnimeToList(false)
        }

    }

    removeAnimeFromList = async (animeId: number) => {
        this.setIsRemovingAnimeFromList(true)

        try {
            await myApiAgent.List.remove(animeId)
            runInAction(() => this.user!.animeIds = this.user!.animeIds.filter(id => id !== animeId))
            store.listStore.clearUserAnimeDetails()
            this.setIsRemovingAnimeFromList(false)
        } catch (error) {
            console.log(error)
            toaster.create({
                title: 'Error',
                description: 'There was a problem removing the anime from your list.',
                type: 'error',
                duration: 5000,
                closable: true,
            })
            this.setIsRemovingAnimeFromList(false)
        }
    }

    setIsAddingAnimeToList = (value: boolean) => {
        this.isAddingAnimeToList = value
    }

    setIsRemovingAnimeFromList = (value: boolean) => {
        this.isRemovingAnimeFromList = value
    }
}