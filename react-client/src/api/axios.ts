import axios from "axios";

export const aniListApi = axios.create({
    baseURL: 'https://graphql.anilist.co'
})

export const myApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})