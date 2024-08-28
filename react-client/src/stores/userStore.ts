import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import { LoginRequest } from "../models/requests/loginRequest";
import { myApiAgent } from "../api/myApiAgent";

export default class UserStore{
    user: User | null = null

    constructor(){
        makeAutoObservable(this)
    }

    login = async (values: LoginRequest) => {
        const response = await myApiAgent.Auth.login(values)
        console.log(response)
    }
}