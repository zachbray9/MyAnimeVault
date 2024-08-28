import axios from "axios";

export const aniListApi = axios.create({
    baseURL: 'https://graphql.anilist.co'
})