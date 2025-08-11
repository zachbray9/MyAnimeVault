import { Box, Button, Flex, Heading, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import { AniListAnime } from "../../models/aniListAnime";
import { FaArrowRightLong, FaCheck, FaRegBookmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { CustomFeaturedNextArrow, CustomFeaturedPrevArrow, usePrevNextButtons } from "./customCarouselArrowButtons";
import CustomDot, { useDotButton } from "./customDot";
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import useAutoPlay from "./autoplay";
import { useState } from "react";

interface Props {
    data: AniListAnime[]
}

const DELAY: number = 10000 //in milliseconds

export default observer(function FeaturedCarousel({ data }: Props) {
    const { userStore } = useStore()
    const [isHovered, setIsHovered] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()])
    const { onStart, onPause } = useAutoPlay(emblaApi, DELAY)
    const { onNextButtonClick, onPrevButtonClick } = usePrevNextButtons(emblaApi)
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, ''); // Removes anything between < and >
    }

    const onHover = () => {
        setIsHovered(true)
        onPause()
    }

    const onUnhover = () => {
        setIsHovered(false)
        onStart()
    }

    return (
        <Box id="featured" pos="relative" display="flex" flexDir="column" gap={4}>
            <Box id="featured-viewport" ref={emblaRef} >
                <Box id="featured-container" display="flex" >
                    {data.map((anime) => (
                        <Box
                            key={anime.id}
                            id="featured-slide"
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="100%"
                            minW={0}
                            maxW="100%"
                            bgImage={[anime.coverImage.extraLarge ?? anime.coverImage.large!, anime.bannerImage!]}
                            position='relative'
                            height={['60vh', null, '70vh']}
                            backgroundPosition='center'
                            backgroundSize='cover'
                            display='flex'
                            alignItems={['end', null, 'center']}
                            justifyContent='left'
                            overflow='visible'
                        >
                            <Box id="featured-slide-overlay" zIndex={1} position='absolute' bottom={0} width={'100%'} height={'75%'} bgGradient='linear(to-b, transparent, rgba(0, 0, 0, 1))' display='flex' />

                            <Stack id="featured-slide-content" zIndex={2} marginTop={[null, '10%']} width='100%' paddingX={[4, null, 40]} paddingY={[4, null, 0]}>
                                <Stack maxW={["100%", null, "70%", null, "50%"]} w={"100%"} gap={4} alignItems={["center", null, "start"]} onMouseEnter={onHover} onMouseLeave={onUnhover}>
                                    <Heading size={['lg', null, 'xl']} textAlign={['center', null, 'left']}>{anime.title.english ?? anime.title.romaji}</Heading>
                                    {anime.genres && <Text color='text.subtle'>{anime.genres.join(', ')}</Text>}
                                    <Text display={{ base: 'none', md: '-webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4' }} overflow='hidden' textOverflow='ellipsis'>{stripHtml(anime.description!)}</Text>
                                    <Flex width={['100%', 'auto']} gap={2} >
                                        <Button as={NavLink} to={`/anime/${anime.id}/details`} bg='#ff640a' width={['100%', 'fit-content']} rightIcon={<FaArrowRightLong />}>Check it out</Button>

                                        {userStore.user?.animeIds.includes(anime.id) ? (

                                            <Tooltip label='Remove from list' hasArrow>
                                                <IconButton aria-label="already-on-list" icon={<FaCheck />} variant='outline' isLoading={userStore.isRemovingAnimeFromList} onClick={() => userStore.removeAnimeFromList(anime.id)} />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip label='Add to list' hasArrow >
                                                <IconButton aria-label="add-to-list" icon={<FaRegBookmark />} variant='outline' isLoading={userStore.isAddingAnimeToList} onClick={() => userStore.addAnimeToList(anime)} />
                                            </Tooltip>
                                        )}
                                    </Flex>

                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Box>

            <CustomFeaturedPrevArrow onClick={onPrevButtonClick} />
            <CustomFeaturedNextArrow onClick={onNextButtonClick} />
            <Box w="100%" display="flex" justifyContent="center">
                <Box id="featured-dots" w="fit-content" display="flex" justifyContent="center" onMouseEnter={onHover} onMouseLeave={onUnhover}>
                    {scrollSnaps.map((_, index) => (
                        <CustomDot key={index} onClick={() => onDotButtonClick(index)} isActive={selectedIndex === index ? true : false} isHovered={isHovered} delay={DELAY} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
})