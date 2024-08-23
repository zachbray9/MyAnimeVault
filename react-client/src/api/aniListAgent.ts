import { AxiosResponse } from "axios";
import { aniListApi } from "./axios"
import { AniListResponseData } from "../models/aniListResponseData";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => aniListApi.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => aniListApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => aniListApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => aniListApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => aniListApi.delete<T>(url).then(ResponseBody)
}

const AnimeData = {
    getTrending: (query: {query: string}) => requests.post<AniListResponseData>('', query),
    getUpcoming: (query: {query: string}) => requests.post<AniListResponseData>('', query),
    getPopular: (query: {query: string}) => requests.post<AniListResponseData>('', query),
    getTopAiring: (query: {query: string}) => requests.post<AniListResponseData>('', query)
}

export const aniListAgent = {
    AnimeData
}