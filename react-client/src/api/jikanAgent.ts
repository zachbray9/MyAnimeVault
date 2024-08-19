import axios from "axios";
import { requests } from "./requests";
import { MalResponseData } from "../models/jikanResponseData";

axios.defaults.baseURL = 'https://api.jikan.moe/v4'

const AnimeData = {
    getTopAiring: () => requests.get<MalResponseData>('/top/anime?filter=airing&limit=10')
}

export const malAgent = {
    AnimeData
}