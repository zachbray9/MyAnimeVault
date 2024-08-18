import { makeAutoObservable } from "mobx";

export default class UserStore{
    constructor(){
        makeAutoObservable(this)
    }
}