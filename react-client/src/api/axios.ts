import axios from "axios";

export const aniListApi = axios.create({
    baseURL: 'https://graphql.anilist.co'
})

export const myApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
})