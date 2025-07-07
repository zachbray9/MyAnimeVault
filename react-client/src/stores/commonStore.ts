import { makeAutoObservable } from "mobx";

export default class CommonStore{
    appLoaded: boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    setAppLoaded = (value: boolean) => {
        this.appLoaded = value
    }

}