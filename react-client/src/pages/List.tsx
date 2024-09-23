import { Box, Flex, Heading, Image, Progress, Stack, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

export default observer(function List() {
    const { listStore } = useStore()

    useEffect(() => {
        listStore.loadList()

        return () => {
            listStore.clearList()
        }
    }, [listStore])

    const imageHeight = ['150px', '225px', '300px']

    return (
        <>
            <Helmet>
                <title>Anime List - MyAnimeVault</title>
            </Helmet>

            <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%'>
                <Stack maxWidth='1200px' width='100%' justifyContent='start' alignItems='start' gap={['1rem', '1.5rem', '4rem']}>
                    <Heading>My list</Heading>

                    <Stack gap={['1rem', '1.25rem', '2rem']} width='100%'>
                        {listStore.list?.map(userAnime => (
                            <Flex as={NavLink} to={`/anime/${userAnime.id}/details`} key={userAnime.id} width='100%' justify='start' gap={['1.5rem', '1.75rem', '2rem']} padding={['1rem', '1.25rem', '1.5rem']} _hover={{bg: 'surface.1'}}>
                                <Image src={userAnime.coverImage?.large} aspectRatio='2/3' boxSize={imageHeight} objectFit='contain' />
                                <Stack width='100%' justify='space-between'>
                                    <Stack>
                                        <Heading size={['sm', 'md', 'lg']}>{userAnime.title?.english || userAnime.title?.romaji}</Heading>
                                        <Text fontSize={['xs', 'sm', 'md']} color='text.subtle'>{`${userAnime.format}, ${userAnime.season} ${userAnime.seasonYear}`}</Text>
                                    </Stack>

                                    <Stack>
                                        <Progress size={['sm', 'md', 'lg']} color='primary.base' min={0} max={userAnime.episodes || (userAnime.numEpisodesWatched === 0 ? Infinity : userAnime.numEpisodesWatched * 2)} value={userAnime.numEpisodesWatched}/>
                                        <Flex justify='space-between'>
                                            <Text fontSize={['xs', 'sm', 'md']} display='flex' alignItems='center' gap={1}><FaStar color="yellow"/> {userAnime.rating}</Text>
                                            <Text fontSize={['xs', 'sm', 'md']}>{`${userAnime.numEpisodesWatched} / ${userAnime.episodes || '?'} ep`}</Text>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </Flex>
                        ))}

                    </Stack>
                </Stack>
            </Box>
        </>
    )
})