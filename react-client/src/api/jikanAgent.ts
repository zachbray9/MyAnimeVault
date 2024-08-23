import { AxiosResponse } from "axios";
import { MalResponseData } from "../models/jikanResponseData";
import { jikanApi } from "./axios";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => jikanApi.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => jikanApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => jikanApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => jikanApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => jikanApi.delete<T>(url).then(ResponseBody)
}

const AnimeData = {
    getTopAiring: () => requests.get<MalResponseData>('/top/anime?filter=airing&limit=20'),
    getPopular: () => requests.get<MalResponseData>('/top/anime?filter=bypopularity&limit=20'),
    getUpcoming: () => requests.get<MalResponseData>('/top/anime?filter=upcoming&limit=20')
}

export const jikanAgent = {
    AnimeData
}