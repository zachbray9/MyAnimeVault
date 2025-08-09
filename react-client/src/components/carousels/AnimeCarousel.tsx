import { Box, Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import { CustomNextCarouselArrow, CustomPrevCarouselArrow, usePrevNextButtons } from "./customCarouselArrowButtons";
import { AniListAnime } from "../../models/aniListAnime";
import CarouselCard from "./CarouselCard";
import useEmblaCarousel from "embla-carousel-react";

interface Props {
    data: AniListAnime[],
    heading: string
}

export default function AnimeCarousel({ data, heading }: Props) {
    const slidesToScroll = useBreakpointValue<number>({ base: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 7 })
    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: slidesToScroll })
    const { onPrevButtonClick, onNextButtonClick, prevBtnDisabled, nextBtnDisabled } = usePrevNextButtons(emblaApi)
    const headingLower = heading.toLowerCase()

    return (
        <Stack className="carousel-main-wrapper" gap={{ base: '0.5rem', md: '1rem' }} paddingX={{ base: '1.25rem', md: '4rem' }} overflow='hidden' >
            <Heading size={{ base: "md", md: "lg" }} fontWeight="semibold">{heading}</Heading>

            <Box id={headingLower} pos="relative">
                <Box id={`${headingLower}-viewport`} ref={emblaRef}>
                    <Box id={`${headingLower}-container`} display="flex">
                        {data.map((anime) => (
                            <Box key={anime.id} id={`${headingLower}-slide`} flexGrow={0} flexShrink={0} flexBasis={["44%", "30%", "25%", "20%", "17%", "13%"]} mr={6}>
                                <CarouselCard anime={anime} key={anime.id} />
                            </Box>
                        ))}
                    </Box>
                </Box>

                <CustomPrevCarouselArrow onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <CustomNextCarouselArrow onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </Box>
        </Stack>
    )
}