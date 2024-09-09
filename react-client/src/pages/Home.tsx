import { Stack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import AnimeCarousel from "../components/carousels/AnimeCarousel"
import FeaturedCarousel from "../components/carousels/FeaturedCarousel"

export default observer(function Home() {
    const { animeStore } = useStore()

    useEffect(() => {
        if (animeStore.featuredShows.length === 0) {
            animeStore.loadFeaturedShows()
        }

        if (animeStore.topAiringShows.length === 0) {
            animeStore.loadTopAiringShows()
        }

        if (animeStore.popularShows.length === 0) {
            animeStore.loadPopularShows()
        }

        if (animeStore.upcomingShows.length === 0) {
            animeStore.loadUpcomingShows()
        }
    }, [animeStore])

    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Explore, rate, and keep track of your favorite anime</title>
            </Helmet>

            <Stack gap='2rem' overflow='hidden'>
                <FeaturedCarousel data={animeStore.featuredShows}/>
                <AnimeCarousel heading='Top Airing' data={animeStore.topAiringShows} />
                <AnimeCarousel heading='Popular' data={animeStore.popularShows} />
                <AnimeCarousel heading='Upcoming' data={animeStore.upcomingShows} />
            </Stack>
        </>
    )
})