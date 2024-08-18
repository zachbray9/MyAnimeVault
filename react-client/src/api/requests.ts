import axios, { AxiosResponse } from "axios";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
    get: <T>(url:string) => axios.get<T>(url).then(ResponseBody),
    post: <T>(url:string, body:object) => axios.post<T>(url, body).then(ResponseBody),
    put: <T>(url:string, body:object) => axios.put<T>(url, body).then(ResponseBody),
    patch: <T>(url:string, body:object) => axios.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url:string) => axios.delete<T>(url).then(ResponseBody)
}