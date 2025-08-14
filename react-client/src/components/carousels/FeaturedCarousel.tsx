import { Badge, Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { AniListAnime } from "../../models/aniListAnime";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { CustomFeaturedNextArrow, CustomFeaturedPrevArrow, usePrevNextButtons } from "./customCarouselArrowButtons";
import CustomDot, { useDotButton } from "./customDot";
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import useAutoPlay from "./autoplay";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import AddRemoveListIconButton from "../animeList/addRemoveListIconButton";

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
                            bgImage={[`url(${anime.coverImage.extraLarge ?? anime.coverImage.large})`, `url(${anime.bannerImage})`]}
                            position='relative'
                            height={['60vh', null, '70vh']}
                            backgroundPosition='center'
                            backgroundSize='cover'
                            display='flex'
                            alignItems={['end', null, 'center']}
                            justifyContent='left'
                            overflow='visible'
                        >
                            <Box id="featured-slide-overlay" zIndex={1} position='absolute' bottom={0} width={'100%'} height={'75%'} bgGradient='to-b' gradientFrom="transparent" gradientTo="background" display='flex' />

                            <Stack id="featured-slide-content" zIndex={2} marginTop={[null, '10%']} width='100%' paddingX={[4, null, 40]} paddingY={[4, null, 0]}>
                                <Stack maxW={["100%", null, "70%", null, "50%"]} w={"100%"} gap={4} alignItems={["center", null, "start"]} onMouseEnter={onHover} onMouseLeave={onUnhover}>
                                    <Heading size={['xl', null, "2xl", '4xl']} textAlign={['center', null, 'left']}>{anime.title.english ?? anime.title.romaji}</Heading>

                                    {/* {anime.genres &&
                                        <Text color="text.subtle" textAlign="center">{anime.genres.join(', ')}</Text>
                                    } */}
                                    <Flex gap={1}>
                                        {anime.genres?.map((genre) => (
                                            <Badge key={genre} bg="blackAlpha.400" borderRadius="full" px={2}>{genre}</Badge>
                                        ))}
                                    </Flex>

                                    <Text display={{ base: 'none', md: '-webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4' }} overflow='hidden' textOverflow='ellipsis'>{stripHtml(anime.description!)}</Text>

                                    <Flex width={['100%', 'auto']} gap={2} justifyContent="center">
                                        <NavLink to={`/anime/${anime.id}/details`}>
                                            <Button bg='interactive.primary' color="text" _hover={{bg: "interactive.primary-hover"}} width={['100%', 'fit-content']} >
                                                Check it out <MoveRight />
                                            </Button>
                                        </NavLink>

                                        <AddRemoveListIconButton
                                            isInList={userStore.user?.animeIds.includes(anime.id) ?? false}
                                            loading={userStore.isRemovingAnimeFromList ?? userStore.isAddingAnimeToList}
                                            onAddToList={() => userStore.addAnimeToList(anime)}
                                            onRemoveFromList={() => userStore.removeAnimeFromList(anime.id)}
                                            variant="ghost"
                                            color="text"
                                            
                                            _hover={{ bg: "whiteAlpha.200" }}
                                        />
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