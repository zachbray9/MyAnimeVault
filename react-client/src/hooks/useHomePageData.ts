import { HomePageQuery } from "../api/queries/homePageQuery";
import { aniListAgent } from "../api/aniListAgent";
import HomePageData from "../models/homePageData";
import { createStandaloneToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function useHomePageData() {
    const { toast } = createStandaloneToast()

    const fetchHomeData = async() : Promise<HomePageData> => {
        const response: HomePageData = await aniListAgent.AnimeData.getHomePageData(HomePageQuery)
        return response
    }

    const { data, isPending, error } = useQuery({
        queryKey: ["home"],
        queryFn: fetchHomeData
    })

    if (error) {
        toast({
            title: "Something went wrong",
            description: "There was a problem getting the home page data.",
            colorScheme: "red",
            position: "top",
            variant: "solid",
            isClosable: true,
            duration: 7000,
            containerStyle: {
                zIndex: 9999
            }
        })
    }

    return {
        featuredShows: data?.data.featured.media ?? [],
        trendingShows: data?.data.trending.media ?? [],
        popularShows: data?.data.popular.media ?? [],
        upcomingShows: data?.data.upcoming.media ?? [],
        isPending
    }
}