import { Box, Button, Flex, Heading, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import { AniListAnime } from "../../models/aniListAnime";
import { featuredResponsive } from "./CarouseBreakpoints";
import '../../styles/Carousel.css'
import { FaArrowRightLong, FaRegBookmark } from "react-icons/fa6";

interface Props {
    data: AniListAnime[]
}

export default function FeaturedCarousel({ data }: Props) {
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
                    containerClass='carousel-container'
                >
                    {data.map((anime) => (
                        <Box key={anime.id} bgImage={[anime.coverImage.large!, anime.bannerImage!]} position='relative' height={['60vh', null, '70vh']} backgroundSize='cover' backgroundPosition='center' display='flex' alignItems='center' justifyContent='center' overflow='visible'>
                            <Box position='absolute' top={0} bottom={0} left={0} right={0} background='rgba(0, 0, 0, 0.3)' bgGradient='linear(to-b, transparent, rgba(0, 0, 0, 1))' display='flex' alignItems='end' justifyContent={['center', null, 'start']} padding={{ base: '1rem', md: '8rem' }}>
                                <Stack alignItems={['center', null, 'start']} maxWidth={['100%', null, '40vw']} gap={4} >
                                    <Heading size={['lg', null, 'xl']} textAlign={['center', null, 'left']}>{anime.title.english ?? anime.title.romaji}</Heading>
                                    {anime.genres && <Text color='text.subtle'>{anime.genres.join(', ')}</Text>}
                                    <Text display={{ base: 'none', md: '-webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4' }} overflow='hidden' textOverflow='ellipsis'>{stripHtml(anime.description!)}</Text>
                                    <Flex width='100%' gap={2}>
                                        <Button bg='#ff640a' width={['100%', null, 'fit-content']} rightIcon={<FaArrowRightLong />}>Check it out</Button>
                                        <Tooltip label='Add to list' hasArrow bg=''>
                                            <IconButton aria-label="add-to-list" icon={<FaRegBookmark />} variant='outline'/>
                                        </Tooltip>
                                    </Flex>
                                </Stack>
                            </Box>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </Box>
    )
}