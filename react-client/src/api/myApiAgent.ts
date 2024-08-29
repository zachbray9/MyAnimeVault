import { AxiosResponse } from "axios";
import { myApi } from "./axios";
import { LoginRequest } from "../models/requests/loginRequest";
import { LoginResponse } from "../models/responses/loginResponse";
import { RegisterRequest } from "../models/requests/registerRequest";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => myApi.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => myApi.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => myApi.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => myApi.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => myApi.delete<T>(url).then(ResponseBody)
}

const Auth = {
    login: (request: LoginRequest) => requests.post<LoginResponse>('/users/login', request),
    register: (request: RegisterRequest) => requests.post<LoginResponse>('/users/register', request),
    getCurrentUser: () => requests.get<LoginResponse>('/users/getCurrentUser')
}

export const myApiAgent = {
    Auth
}