import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { LoginRequest } from "../models/requests/loginRequest";
import { myApiAgent } from "../api/myApiAgent";
import { store } from "./store";
import { RegisterRequest } from "../models/requests/registerRequest";

export default class UserStore{
    user: User | null = null

    constructor(){
        makeAutoObservable(this)
    }

    login = async (values: LoginRequest, navigate: (path: string) => void) => {
        const response = await myApiAgent.Auth.login(values)
        store.commonStore.setAuthToken(response.user.AuthToken)
        runInAction(() => this.user = response.user)
        navigate('/')
    }

    register = async (values: RegisterRequest, navigate: (path: string) => void) => {
        const response = await myApiAgent.Auth.register(values)
        store.commonStore.setAuthToken(response.user.AuthToken)
        runInAction(() => this.user = response.user)
        navigate('/')
    }

    logout = (navigate: (path: string) => void) => {
        store.commonStore.setAuthToken(null)
        this.user = null
        navigate('/')
    }

    getCurrentUser = async(navigate: (path:string) => void) => {
        try{
            const response = await myApiAgent.Auth.getCurrentUser()
            store.commonStore.setAuthToken(response.user.AuthToken)
            runInAction(() => this.user = response.user)
            navigate('/')
        }catch(error){
            console.log(error)
            throw error
        }
    }
}