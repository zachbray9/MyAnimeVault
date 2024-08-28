import { AxiosResponse } from "axios";
import { myApi } from "./axios";
import { LoginRequest } from "../models/requests/loginRequest";
import { User } from "../models/user";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => myApi.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => myApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => myApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => myApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => myApi.delete<T>(url).then(ResponseBody)
}

const Auth = {
    login: (request: LoginRequest) => requests.post<User>('/users/login', request)
}

export const myApiAgent = {
    Auth
}