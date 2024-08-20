import { Stack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import FeaturedShow from "../components/featured/FeaturedShow"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import AnimeCarousel from "../components/carousels/AnimeCarousel"

export default observer( function Home() {
    const {animeStore} = useStore()

    useEffect(() => {
        if(animeStore.topAiringShows.length == 0){
            animeStore.loadTopAiringShows()
        }

        if(animeStore.popularShows.length == 0){
            animeStore.loadPopularShows()
        }

        if(animeStore.upcomingShows.length == 0){
            animeStore.loadUpcomingShows()
        }
    }, [animeStore])

    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Home</title>
            </Helmet>

            <Stack>
                <FeaturedShow />
                <AnimeCarousel heading='Top Airing' data={animeStore.topAiringShows}/>
                <AnimeCarousel heading='Popular' data={animeStore.popularShows}/>
                <AnimeCarousel heading='Upcoming' data={animeStore.upcomingShows}/>
            </Stack>
        </>
    )
})