import Carousel from "react-multi-carousel";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import 'react-multi-carousel/lib/styles.css'
import '../../styles/Carousel.css'
import { responsive } from "./CarouseBreakpoints";
import { CustomLeftCarouselArrow, CustomRightCarouselArrow } from "./CustomCarouselArrow";
import { AniListAnime } from "../../models/aniListAnime";

interface Props{
    data: AniListAnime[],
    heading: string
}

export default function TopAiringCarousel({data, heading}:Props) {
    return (
        <Stack className="carousel-main-wrapper" gap='2rem' padding={{base: '1.25rem', md: '4rem'}} overflow='hidden' >
            <Heading>{heading}</Heading>
            <Box overflow='visible' position='relative'>
                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={false}
                    partialVisbile={false}
                    customLeftArrow={<CustomLeftCarouselArrow />}
                    customRightArrow={<CustomRightCarouselArrow />}
                    containerClass='carousel-container'
                    itemClass='carousel-item'
                >
                    {data.map((anime) => (
                        <Box key={anime.id} gap={4} bg=''>
                            <Image src={anime.coverImage.large ?? undefined} width='100%' aspectRatio='2/3' objectFit='contain' />
                            <Text fontSize='sm'>{anime.title.english ?? anime.title.native}</Text>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </Stack>
    )
}