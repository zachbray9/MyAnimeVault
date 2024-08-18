import axios from "axios";
import { requests } from "./requests";
import { MalResponseData } from "../models/malResponseData";

axios.defaults.baseURL = 'https://api.myanimelist.net/v2'

axios.interceptors.request.use(config => {
    const malClientId = import.meta.env.VITE_MAL_CLIENT_ID

    if(malClientId){
        config.headers['X-MAL-CLIENT-ID'] = malClientId
    }
    console.log("MAL client id: " + malClientId)
    return config
})

const AnimeData = {
    getTopAiring: () => requests.get<MalResponseData>('/anime/ranking?ranking_type=airing&limit=10')
}

export const malAgent = {
    AnimeData
}