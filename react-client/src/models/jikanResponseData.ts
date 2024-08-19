import { Anime } from "./anime";

export interface MalResponseData{
    data: Anime[]
    paging: {
        last_visible_page: number,
        has_next_page: boolean,
        items: {
            count: number,
            total: number,
            per_page: number
        }
    }
}