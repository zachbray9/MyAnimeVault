import axios, { AxiosError, AxiosResponse } from "axios";
import { myApi } from "./axios";
import { LoginRequest } from "../models/requests/loginRequest";
import { LoginResponse } from "../models/responses/loginResponse";
import { RegisterRequest } from "../models/requests/registerRequest";
import { store } from "../stores/store";
import { AniListAnime } from "../models/aniListAnime";
import { GetUserAnimeDetailsResponse } from "../models/responses/getUserAnimeDetailsResponse";
import { createStandaloneToast } from "@chakra-ui/react";
import { UserAnimePatchRequest } from "../models/requests/userAnimePatchRequest";
import { GetListResponse } from "../models/responses/getListResponse";
import { RefreshResponse } from "../models/responses/refreshResponse";
import { jwtDecode } from "jwt-decode";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;
const { toast } = createStandaloneToast()

myApi.interceptors.request.use(async config => {
    let token = store.commonStore.token

    if (token && config.headers) {
        try {
            const decodedToken = jwtDecode<{ exp: number }>(token)
            const isExpired = decodedToken.exp < (Date.now() / 1000)

            if (isExpired) {
                const response = await axios.get<RefreshResponse>(import.meta.env.VITE_API_URL + '/users/refresh', {withCredentials: true})
                store.commonStore.setAuthToken(response.data.accessToken)
                token = store.commonStore.token
                console.log("Token refresh was successful")
            }

            config.headers.Authorization = token
        } catch (error) {
            return Promise.reject(error)
        }

    }

    return config
}, error => {
    return Promise.reject(error)
})

myApi.interceptors.response.use(async response => {
    return response
}, async (error: AxiosError) => {
    const { status, data } = error.response as AxiosResponse

    if(error.response){
        switch (status) {
            case 401:
                if(data.error == 'invalid_refresh_token'){
                    store.userStore.logout()
        
                    toast({
                        title: 'Session expired',
                        description: 'Your session has expired. Please login again to continue.',
                        status: 'error',
                        position: 'top',
                        isClosable: true
                    })
                }
                break
        }
    }
})

const requests = {
    get: <T>(url: string) => myApi.get<T>(url).then(ResponseBody),
    post: <T>(url: string, body: object) => myApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url: string, body: object) => myApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url: string, body: object) => myApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url: string) => myApi.delete<T>(url).then(ResponseBody)
}

const Auth = {
    login: (request: LoginRequest) => requests.post<LoginResponse>('/users/login', request),
    register: (request: RegisterRequest) => requests.post<LoginResponse>('/users/register', request),
    getCurrentUser: () => requests.get<LoginResponse>('/users/getCurrentUser'),
    refresh: () => requests.get<RefreshResponse>('/users/refresh'),
    logout: () => requests.delete('/users/logout')
}

const List = {
    add: (anime: AniListAnime) => requests.post('/user/anime', anime),
    getList: () => requests.get<GetListResponse>('/user/anime'),
    getUserAnimeDetails: (animeId: number) => requests.get<GetUserAnimeDetailsResponse>(`/user/anime/${animeId}`),
    updateUserAnime: (animeId: number, patchRequest: UserAnimePatchRequest) => requests.patch(`/user/anime/${animeId}`, patchRequest)
}

export const myApiAgent = {
    Auth,
    List
}