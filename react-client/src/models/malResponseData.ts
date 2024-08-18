import { Anime } from "./anime";

export interface MalResponseData{
    data: {
       node: Anime
    }[],
    paging: {
        previous: string,
        next: string
    }
}