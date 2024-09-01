import { AxiosError, AxiosResponse } from "axios";
import { myApi } from "./axios";
import { LoginRequest } from "../models/requests/loginRequest";
import { LoginResponse } from "../models/responses/loginResponse";
import { RegisterRequest } from "../models/requests/registerRequest";
import { store } from "../stores/store";
import { AniListAnime } from "../models/aniListAnime";
import { GetUserAnimeDetailsResponse } from "../models/responses/getUserAnimeDetailsResponse";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

myApi.interceptors.request.use(config => {
    const token = store.commonStore.token
    
    if(token && config.headers){
        config.headers.Authorization = token
    }

    return config
})

myApi.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    const {status} = error.response as AxiosResponse

    switch(status){
        case 401:
            store.userStore.logout()
            break
    }
})

const requests = {
    get: <T>(url:string) => myApi.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => myApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => myApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => myApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => myApi.delete<T>(url).then(ResponseBody)
}

const Auth = {
    login: (request: LoginRequest) => requests.post<LoginResponse>('/users/login', request),
    register: (request: RegisterRequest) => requests.post<LoginResponse>('/users/register', request),
    getCurrentUser: () => requests.get<LoginResponse>('/users/getCurrentUser')
}

const List = {
    add: (anime: AniListAnime) => requests.post('/user/anime', anime),
    getList: () => requests.get('/user/anime'),
    getUserAnimeDetails: (animeId: number) => requests.get<GetUserAnimeDetailsResponse>(`/user/anime/${animeId}`),
    updateRating: (animeId: number, rating: number) => requests.patch(`/user/anime/${animeId}`, {rating})
}

export const myApiAgent = {
    Auth,
    List
}