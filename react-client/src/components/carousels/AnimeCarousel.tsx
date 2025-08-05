import Carousel from "react-multi-carousel";
import { Box, Heading, Stack } from "@chakra-ui/react";
import 'react-multi-carousel/lib/styles.css'
import '../../styles/Carousel.css'
import { regularResponsive } from "./CarouseBreakpoints";
import { CustomLeftCarouselArrow, CustomRightCarouselArrow } from "./CustomCarouselArrow";
import { AniListAnime } from "../../models/aniListAnime";
import CarouselCard from "./CarouselCard";

interface Props{
    data: AniListAnime[],
    heading: string
}

export default function AnimeCarousel({data, heading}:Props) {
    return (
        <Stack as="section" className="carousel-main-wrapper" gap={{base: '0.5rem', md: '2rem'}} padding={{base: '1.25rem', md: '4rem'}} overflow='hidden' >
            <Heading size={{base: "lg", md: "xl"}} fontWeight="semibold">{heading}</Heading>
            <Box overflow='visible' position='relative'>
                <Carousel
                    responsive={regularResponsive}
                    swipeable={true}
                    draggable={false}
                    partialVisbile={false}
                    customLeftArrow={<CustomLeftCarouselArrow />}
                    customRightArrow={<CustomRightCarouselArrow />}
                    containerClass='carousel-container'
                    itemClass='carousel-item'
                >
                    {data.map((anime) => (
                        <CarouselCard anime={anime} key={anime.id}/>
                    ))}
                </Carousel>
            </Box>
        </Stack>
    )
}