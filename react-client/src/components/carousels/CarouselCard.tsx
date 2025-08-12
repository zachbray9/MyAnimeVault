import { Box, Flex, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { AniListAnime } from "../../models/aniListAnime";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import '../../styles/CarouselCard.css'
import { Tooltip } from "../ui/tooltip";
import { Bookmark, Check, Star } from "lucide-react"

interface Props {
    anime: AniListAnime
}

export default observer(function CarouselCard({ anime }: Props) {
    const { userStore } = useStore()

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
        <Stack asChild key={anime.id} position='relative' gap={2} cursor='pointer' _hover={{ '& .overlay': { opacity: 1 } }}>
            <NavLink to={`/anime/${anime.id}/details`}>
                <Image id="anime-poster" src={anime.coverImage.large ?? undefined} width='100%' aspectRatio='2/3' objectFit='contain' />

                <Text id="anime-title" fontSize={{ base: "xs", md: "sm" }}>{anime.title.english ?? anime.title.romaji}</Text>

                <Box className='overlay' position='absolute' top='-.5rem' bottom='-.5rem' right='-.5rem' left='-.5rem' opacity={0} transition='opacity 0.2s ease' overflow='hidden'>
                    <Image src={anime.coverImage.large} position='absolute' top={0} bottom={0} left={0} right={0} width='100%' height='100%' objectFit='cover' />
                    <Box position='absolute' top={0} bottom={0} left={0} right={0} bg='rgb(20, 21, 25, 0.9)'>
                        <Stack height='100%' justifyContent='space-between' padding='0.5rem'>
                            <Stack gap={2}>
                                <Text fontSize='sm'>{anime.title.english || anime.title.romaji}</Text>
                                <Flex alignItems="center" gap={1}>
                                    <Star size={16}/>
                                    <Text fontSize='xs'>{anime.averageScore ? anime.averageScore / 10 : 'Unscored'}</Text>
                                </Flex>
                                <Text fontSize='xs' color='text.subtle'>{(anime.episodes || '?') + ' episodes'}</Text>
                                <Text fontSize='xs' lineClamp={5}>{cleanDescription}</Text>
                            </Stack>
                            <Flex >
                                {userStore.user?.animeIds.includes(anime.id) ? (
                                    <Tooltip content='Remove from list' positioning={{ placement: "top" }} showArrow>
                                        <IconButton aria-label="add-to-list-button-card" variant='ghost' color='primary.base' onClick={handleRemoveFromList} loading={userStore.isRemovingAnimeFromList} >
                                            <Check />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content='Add to list' positioning={{ placement: "top" }} showArrow>
                                        <IconButton aria-label="add-to-list-button-card" variant='ghost' color='primary.base' onClick={handleAddToList} loading={userStore.isAddingAnimeToList} >
                                            <Bookmark />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Flex>
                        </Stack>
                    </Box>
                </Box>
            </NavLink>

        </Stack>
    )
})