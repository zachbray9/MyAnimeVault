import { Stack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import TopAiringCarousel from "../components/carousels/TopAiringCarousel"
import TopUpcomingCarousel from "../components/carousels/TopUpcomingCarousel"
import PopularCarousel from "../components/carousels/PopularCarousel"
import FeaturedShow from "../components/featured/FeaturedShow"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Home</title>
            </Helmet>

            <Stack>
                <FeaturedShow />
                <TopAiringCarousel />
                <TopUpcomingCarousel />
                <PopularCarousel />
            </Stack>
        </>
    )
}