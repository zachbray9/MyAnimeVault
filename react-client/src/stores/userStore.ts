import { makeAutoObservable } from "mobx";
import { User } from "../models/user";

export default class UserStore{
    user: User | null = null

    constructor(){
        makeAutoObservable(this)
    }
}