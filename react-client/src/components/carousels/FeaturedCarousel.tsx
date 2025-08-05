import { Box, Button, Flex, Heading, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import { AniListAnime } from "../../models/aniListAnime";
import { featuredResponsive } from "./CarouseBreakpoints";
import '../../styles/Carousel.css'
import { FaArrowRightLong, FaCheck, FaRegBookmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { CustomFeaturedLeftArrow, CustomFeaturedRightArrow } from "./CustomCarouselArrow";

interface Props {
    data: AniListAnime[]
}

export default observer(function FeaturedCarousel({ data }: Props) {
    const { userStore } = useStore()

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, ''); // Removes anything between < and >
    }

    return (
        <Box as="section" overflow='hidden'>
            <Box overflow='visible' position='relative'>
                <Carousel
                    responsive={featuredResponsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    swipeable={true}
                    containerClass='carousel-container'
                    customLeftArrow={<CustomFeaturedLeftArrow />}
                    customRightArrow={<CustomFeaturedRightArrow />}
                >
                    {data.map((anime) => (
                        <Box id="carousel-item-container" key={anime.id} bgImage={[anime.coverImage.extraLarge ?? anime.coverImage.large!, anime.bannerImage!]} position='relative' height={['60vh', null, '70vh']} backgroundPosition='center' backgroundSize='cover' display='flex' alignItems={['end', null, 'center']} justifyContent='left' overflow='visible' >
                            <Box id="carousel-item-overlay" zIndex={1} position='absolute' bottom={0} width={'100%'} height={'75%'} bgGradient='linear(to-b, transparent, rgba(0, 0, 0, 1))' display='flex' />

                            <Stack id="carousel-item-content" zIndex={2} marginTop={[null, '10%']} width='100%' paddingX={[4, null, 40]} paddingY={[4, null, 0]}>
                                <Stack maxW={["100%", null, "70%", null, "50%"]} w={"100%"} gap={4} alignItems={["center", null, "start"]}>
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
                </Carousel>
            </Box>
        </Box>
    )
})