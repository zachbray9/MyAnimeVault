import axios from "axios";
import { requests } from "./requests";
import { MalResponseData } from "../models/jikanResponseData";

axios.defaults.baseURL = 'https://api.jikan.moe/v4'

const AnimeData = {
    getTopAiring: () => requests.get<MalResponseData>('/top/anime?filter=airing&limit=20'),
    getPopular: () => requests.get<MalResponseData>('/top/anime?filter=bypopularity&limit=20'),
    getUpcoming: () => requests.get<MalResponseData>('/top/anime?filter=upcoming&limit=20')
}

export const jikanAgent = {
    AnimeData
}