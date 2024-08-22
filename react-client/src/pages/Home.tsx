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
        const loadAllShows = async() => {
            if(animeStore.topAiringShows.length === 0){
                await animeStore.loadTopAiringShows()
                await delay(1000)
            }
    
            if(animeStore.popularShows.length === 0){
                animeStore.loadPopularShows()
                await delay(1000)
            }
    
            if(animeStore.upcomingShows.length === 0){
                animeStore.loadUpcomingShows()
                await delay(1000)
            }
        }

        loadAllShows()
    }, [animeStore])

    function delay(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Explore, rate, and keep track of your favorite anime</title>
            </Helmet>

            <Stack gap='2rem'>
                <FeaturedShow />
                <AnimeCarousel heading='Top Airing' data={animeStore.topAiringShows}/>
                <AnimeCarousel heading='Popular' data={animeStore.popularShows}/>
                <AnimeCarousel heading='Upcoming' data={animeStore.upcomingShows}/>
            </Stack>
        </>
    )
})