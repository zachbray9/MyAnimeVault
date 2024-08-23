import axios from "axios";

export const aniListApi = axios.create({
    baseURL: 'https://graphql.anilist.co'
})

export const jikanApi = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
})