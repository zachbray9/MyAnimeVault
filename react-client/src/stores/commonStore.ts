import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore{
    token: string | null | undefined = localStorage.getItem("authToken")
    appLoaded: boolean = false

    constructor(){
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if(token){
                    localStorage.setItem("authToken", token)
                }else{
                    localStorage.removeItem("authToken")
                }
            }
        )
    }

    setAuthToken = (token: string | null) => {
        this.token = token
    }

    setAppLoaded = (value: boolean) => {
        this.appLoaded = value
    }

}