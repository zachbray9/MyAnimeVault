import Carousel from "react-multi-carousel";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import 'react-multi-carousel/lib/styles.css'

export default observer(function TopAiringCarousel() {
    const { animeStore } = useStore()

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7,
          slidesToSlide: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1
        }
      };

    useEffect(() => {
        animeStore.loadTopAiringShows()
    }, [animeStore])

    return (
        <Stack gap={4} paddingLeft='4rem' paddingRight='4rem'>
            <Heading>Top Airing</Heading>

            <Carousel responsive={responsive} swipeable={true} containerClass='carousel-container' itemClass='carousel-item-padding-20-px'>
                {animeStore.topAiringShows.map((anime) => (
                    <Box key={anime.mal_id} gap={2}>
                        <Image src={anime.images.webp.image_url ?? undefined}/>
                        <Text>{anime.titles[0].title}</Text>
                    </Box>
                ))}
            </Carousel>
        </Stack>
    )
        
})