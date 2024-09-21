import { AspectRatio, Badge, Box, Flex, Grid, Heading, Icon, Image, Skeleton, Stack, Text, Wrap } from "@chakra-ui/react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FaStar } from "react-icons/fa6";
import DOMPurify from "dompurify";
import AddToListButtonForm from "../components/forms/addToListButtonForm";
import LoadingComponent from "../components/common/loading/LoadingComponent";
import RatingInputForm from "../components/forms/ratingInputForm";
import WatchStatusInputForm from "../components/forms/watchStatusInputForm";
import NumEpisodesWatchedInputForm from "../components/forms/numEpisodesWatchedInputForm";
import { Helmet } from "react-helmet-async";
import { CharacterEdge } from "../models/characterEdge";
import CharacterCard from "../components/animeDetails/characterCard";

export default observer(function AnimeDetails() {
    const { animeStore, listStore, userStore } = useStore()
    const { animeId } = useParams()
    const { selectedAnime } = animeStore
    const { userAnimeDetails } = listStore

    useEffect(() => {
        const loadAnime = async () => {
            if (animeId) {
                await animeStore.loadAnimeDetails(parseInt(animeId, 10))
            }
        }

        loadAnime()
        console.log(animeStore.selectedAnime)

        return () => {
            animeStore.clearSelectedAnime()
        }
    }, [animeId, animeStore])

    useEffect(() => {
        const loadUserAnime = async () => {
            if (userStore.user && selectedAnime) {
                await listStore.loadUserAnimeDetails(selectedAnime.id)
            }
        }

        loadUserAnime()

        return () => {
            listStore.clearUserAnimeDetails()
        }
    }, [listStore, selectedAnime, userStore.user])

    const averageScore = selectedAnime?.averageScore ? parseFloat((selectedAnime.averageScore * 0.1).toFixed(1)) : null

    if (animeStore.isLoadingSelectedAnime) {
        return (
            <LoadingComponent text="Loading anime..." />
        )
    }

    return (
        <>
            <Helmet>
                <title>{`${selectedAnime?.title.english || selectedAnime?.title.romaji} - MyAnimeVault`}</title>
            </Helmet>

            <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%' >
                <Stack maxWidth='1200px' width='100%' justifyContent='center' alignItems='center' gap='8rem'>
                    <Flex justify='center' wrap='wrap' gap='2rem' >
                        <Image src={selectedAnime?.coverImage.large} aspectRatio='2/3' />
                        <Stack gap={4}>
                            {/* Title */}
                            <Heading size='lg'>{selectedAnime?.title.english || selectedAnime?.title.romaji}</Heading>

                            {/* Genres */}
                            <Wrap>
                                {selectedAnime?.genres && selectedAnime.genres.map(genre => (
                                    <Badge key={genre} variant='subtle' borderRadius={14} width='fit-content' paddingX={2} color='gray.500' fontSize='xs'>{genre}</Badge>
                                ))}
                            </Wrap>

                            {/* Media Type and season */}
                            <Text fontSize='xs' color='text.subtle'>{`${selectedAnime?.format} | ${selectedAnime?.season} ${selectedAnime?.seasonYear}`}</Text>

                            {/* Score */}
                            <Flex align='center' justify='start' gap={1}>
                                <Icon as={FaStar} boxSize='1.5rem' color='yellow' />
                                <Text fontSize='1.25rem'>{averageScore || 'Unscored'}</Text>
                            </Flex>

                            {/* List controls */}
                            <Skeleton isLoaded={!listStore.isLoadingUserAnimeDetails}>
                                {userAnimeDetails ? (
                                    <Stack gap='1rem'>
                                        <RatingInputForm />
                                        <WatchStatusInputForm />
                                        <NumEpisodesWatchedInputForm />
                                    </Stack>
                                ) : (
                                    <AddToListButtonForm animeToAdd={animeStore.selectedAnime!} />
                                )}
                            </Skeleton>
                        </Stack>
                    </Flex>
                    

                    {/* Synopsis */}
                    <Stack gap='1rem' width='100%'>
                        <Heading size='md'>Synopsis</Heading>
                        {selectedAnime?.description ? (
                            <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedAnime?.description) }} />
                        ) : (
                            <Text>No synopsis</Text>
                        )}
                    </Stack>

                    {/* trailer */}
                    <Stack gap='1rem' width='100%'>
                        <Heading size='md'>Trailer</Heading>
                        {selectedAnime?.trailer ? (
                            <AspectRatio ratio={4 / 3} maxWidth={560}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedAnime.trailer.id}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />   
                            </AspectRatio>
                        ) : (
                            <Text>No trailer</Text>
                        )}
                    </Stack>

                    {/* Characters */}
                    <Stack gap='1rem' width='100%'>
                        <Heading size='md'>Characters</Heading>
                        <Grid templateColumns={['1fr', null, '1fr 1fr', '1fr 1fr 1fr']} rowGap='1rem' columnGap='2rem'>
                            {selectedAnime?.characters ? (
                                selectedAnime.characters.edges.map((character: CharacterEdge) => (
                                    <CharacterCard character={character} key={character.node.name.full}/>
                                ))
                            ) : (
                                <Text>No characters</Text>
                            )}

                        </Grid>
                    </Stack>

                </Stack>
            </Box>
        </>
    )
})