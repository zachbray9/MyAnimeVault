import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "./useDebounce";
import { aniListAgent } from "../api/aniListAgent";
import { LoadSearchResultsQuery } from "../api/queries/loadSearchResultsQuery";
import { AniListResponseDataPaged } from "../models/responses/aniListResponseData";

export default function useAnimeSearch() {
    const [query, setQuery] = useState<string>("")
    const debouncedQuery = useDebounce(query, 500)

    const search = async(query: string) : Promise<AniListResponseDataPaged> => {
        const loadedQuery = LoadSearchResultsQuery(query)
        const results: AniListResponseDataPaged = await aniListAgent.AnimeData.getSearchResults(loadedQuery)
        return results
    }

    const {data, isPending, error} = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: () => search(debouncedQuery),
        enabled: !!debouncedQuery
    })

    return {query, setQuery, results: data?.data.Page.media ?? [], isPending, error}
}