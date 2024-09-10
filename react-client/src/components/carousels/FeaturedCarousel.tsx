import { Box, Button, Flex, Heading, IconButton, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import { AniListAnime } from "../../models/aniListAnime";
import { featuredResponsive } from "./CarouseBreakpoints";
import '../../styles/Carousel.css'
import { FaArrowRightLong, FaCheck, FaRegBookmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Form, Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    data: AniListAnime[]
}

export default observer(function FeaturedCarousel({ data }: Props) {
    const { userStore } = useStore()
    const toast = useToast()

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, ''); // Removes anything between < and >
    }

    return (
        <Box overflow='hidden'>
            <Box overflow='visible'>
                <Carousel
                    responsive={featuredResponsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    swipeable={true}
                    containerClass='carousel-container'
                >
                    {data.map((anime) => (
                        <Box key={anime.id} bgImage={[anime.coverImage.large!, anime.bannerImage!]} position='relative' height={['60vh', null, '70vh']} backgroundSize='cover' backgroundPosition='center' display='flex' alignItems='center' justifyContent='center' overflow='visible'>
                            <Box position='absolute' top={0} bottom={0} left={0} right={0} background='rgba(0, 0, 0, 0.3)' bgGradient='linear(to-b, transparent, rgba(0, 0, 0, 1))' display='flex' alignItems='end' justifyContent={['center', null, 'start']} padding={{ base: '1rem', md: '8rem' }}>
                                <Stack alignItems={['center', null, 'start']} width='100%' maxWidth={['100%', null, '40vw']} gap={4} >
                                    <Heading size={['lg', null, 'xl']} textAlign={['center', null, 'left']}>{anime.title.english ?? anime.title.romaji}</Heading>
                                    {anime.genres && <Text color='text.subtle'>{anime.genres.join(', ')}</Text>}
                                    <Text display={{ base: 'none', md: '-webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4' }} overflow='hidden' textOverflow='ellipsis'>{stripHtml(anime.description!)}</Text>
                                    <Flex width={['100%', 'auto']} gap={2} >
                                        <Button as={NavLink} to={`/anime/${anime.id}/details`} bg='#ff640a' width={['100%', 'fit-content']} rightIcon={<FaArrowRightLong />}>Check it out</Button>
                                        {userStore.user?.animeIds?.includes(anime.id) ? (
                                            <Tooltip label='Already on list' hasArrow>
                                                <IconButton aria-label="already-on-list" icon={<FaCheck />} variant='outline'/>
                                            </Tooltip>
                                        ) : (
                                            <Formik
                                                initialValues={{ anime: anime }}
                                                onSubmit={(values) => userStore.addAnimeToList(values.anime)
                                                    .catch(() => toast({ title: 'Error', description: 'There was a problem adding the anime to your list.', status: 'error', duration: 5000, isClosable: true, position: 'top' }))}
                                            >
                                                {({ handleSubmit, isSubmitting }) => (
                                                    <Form onSubmit={handleSubmit}>
                                                        <Tooltip label='Add to list' hasArrow >
                                                            <IconButton aria-label="add-to-list" type="submit" icon={<FaRegBookmark />} variant='outline' isLoading={isSubmitting} />
                                                        </Tooltip>
                                                    </Form>
                                                )}
                                            </Formik>

                                        )}

                                    </Flex>
                                </Stack>
                            </Box>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </Box>
    )
})