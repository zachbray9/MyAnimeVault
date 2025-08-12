import { AxiosError, AxiosResponse } from "axios";
import { myApi } from "./axios";
import { LoginRequest } from "../models/requests/loginRequest";
import { LoginResponse } from "../models/responses/loginResponse";
import { RegisterRequest } from "../models/requests/registerRequest";
import { AniListAnime } from "../models/aniListAnime";
import { GetUserAnimeDetailsResponse } from "../models/responses/getUserAnimeDetailsResponse";
import { UserAnimePatchRequest } from "../models/requests/userAnimePatchRequest";
import { GetListResponse } from "../models/responses/getListResponse";
import { RefreshResponse } from "../models/responses/refreshResponse";
import { store } from "../stores/store";
import { toaster } from "../components/ui/toaster";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

myApi.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
        const { response } = err

        if (response?.status === 401 && store.userStore.isLoggedIn) {
            store.userStore.logout()
            
            toaster.create({
                title: "Logged out",
                description: "Your session has expired. Please login again to power up.",
                type: "warning",
                closable: true,
                duration: 7000,
            })
        }
    }
)

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
    updateUserAnime: (animeId: number, patchRequest: UserAnimePatchRequest) => requests.patch(`/user/anime/${animeId}`, patchRequest),
    remove: (animeId: number) => requests.delete(`/user/anime/${animeId}`)
}

export const myApiAgent = {
    Auth,
    List
}