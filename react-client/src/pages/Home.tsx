import { Stack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import { observer } from "mobx-react-lite"
import AnimeCarousel from "../components/carousels/AnimeCarousel"
import FeaturedCarousel from "../components/carousels/FeaturedCarousel"
import useHomePageData from "../hooks/useHomePageData"

export default observer(function Home() {
    const { featuredShows, trendingShows, popularShows, upcomingShows} = useHomePageData()

    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Explore, rate, and keep track of your favorite anime</title>
            </Helmet>

            <Stack gap='2rem' overflow='hidden'>
                <FeaturedCarousel data={featuredShows}/>
                <AnimeCarousel heading='Top Airing' data={trendingShows} />
                <AnimeCarousel heading='Popular' data={popularShows} />
                <AnimeCarousel heading='Upcoming' data={upcomingShows} />
            </Stack>
        </>
    )
})