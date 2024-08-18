import { makeAutoObservable } from "mobx";

export default class CommonStore{
    constructor(){
        makeAutoObservable(this)
    }
}