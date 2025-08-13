import { HomePageQuery } from "../api/queries/homePageQuery";
import { aniListAgent } from "../api/aniListAgent";
import HomePageData from "../models/homePageData";
import { useQuery } from "@tanstack/react-query";
import { toaster } from "../components/ui/toaster";

export default function useHomePageData() {
    const fetchHomeData = async (): Promise<HomePageData> => {
        const response: HomePageData = await aniListAgent.AnimeData.getHomePageData(HomePageQuery)
        return response
    }

    const { data, isPending, error } = useQuery({
        queryKey: ["home"],
        queryFn: fetchHomeData,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })

    if (error) {
        toaster.create({
            title: "Something went wrong",
            description: "There was a problem getting the home page data.",
            type: "error",
            closable: true,
            duration: 7000,
        })
    }

    return {
        featuredShows: data?.data.featured.media.filter(anime => anime.bannerImage) ?? [],
        trendingShows: data?.data.trending.media ?? [],
        popularShows: data?.data.popular.media ?? [],
        upcomingShows: data?.data.upcoming.media ?? [],
        isPending
    }
}