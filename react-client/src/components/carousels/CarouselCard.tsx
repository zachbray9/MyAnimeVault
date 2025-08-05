import { Box, Flex, Icon, IconButton, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import { AniListAnime } from "../../models/aniListAnime";
import { NavLink } from "react-router-dom";
import { FaCheck, FaRegBookmark, FaStar } from "react-icons/fa6";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import '../../styles/CarouselCard.css'

interface Props {
    anime: AniListAnime
}

export default observer(function CarouselCard({ anime }: Props) {
    const {userStore} = useStore()

    function stripHtmlTags(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText;
    }

    const cleanDescription = stripHtmlTags(anime.description ?? "")

    const handleAddToList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        userStore.addAnimeToList(anime)
    }

    const handleRemoveFromList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        
        userStore.removeAnimeFromList(anime.id)
    }

    return (
        <Stack as={NavLink} to={`/anime/${anime.id}/details`} key={anime.id} position='relative' gap={2} cursor='pointer' _hover={{'.overlay': {opacity: 1}}}>
            <Image id="anime-poster" src={anime.coverImage.large ?? undefined} width='100%' aspectRatio='2/3' objectFit='contain' />

            <Text id="anime-title" fontSize={{base: "xs", md: "sm"}}>{anime.title.english ?? anime.title.romaji}</Text>

            <Box className='overlay' position='absolute' top='-.5rem' bottom='-.5rem' right='-.5rem' left='-.5rem' opacity={0} transition='opacity 0.2s ease' overflow='hidden'>
                <Image src={anime.coverImage.large} position='absolute' top={0} bottom={0} left={0} right={0} width='100%' height='100%' objectFit='cover' />
                <Box position='absolute' top={0} bottom={0} left={0} right={0} bg='rgb(20, 21, 25, 0.9)'>
                    <Stack height='100%' justifyContent='space-between' padding='0.5rem'>
                        <Stack gap={2}>
                            <Text fontSize='sm'>{anime.title.english || anime.title.romaji}</Text>
                            <Text fontSize='xs'>{anime.averageScore ? anime.averageScore / 10 : 'Unscored'} <Icon as={FaStar}/></Text>
                            <Text fontSize='xs' color='text.subtle'>{(anime.episodes || '?') + ' episodes'}</Text>
                            <Text fontSize='xs' noOfLines={5}>{cleanDescription}</Text>
                        </Stack>
                        <Flex >
                            {userStore.user?.animeIds.includes(anime.id) ? (
                                <Tooltip label='Remove from list' placement="top" hasArrow>
                                <IconButton aria-label="add-to-list-button-card" icon={<FaCheck />} display='flex' justifyContent='center' alignItems='center' variant='ghost' color='primary.base' onClick={handleRemoveFromList} isLoading={userStore.isRemovingAnimeFromList} />
                            </Tooltip>
                            ) : (
                                <Tooltip label='Add to list' placement="top" hasArrow>
                                    <IconButton aria-label="add-to-list-button-card" icon={<FaRegBookmark />} display='flex' justifyContent='center' alignItems='center' variant='ghost' color='primary.base' onClick={handleAddToList} isLoading={userStore.isAddingAnimeToList} />
                                </Tooltip>
                            )}
                        </Flex>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
})