import { Badge, Box, Flex, Heading, Icon, Image, Stack, Text, Wrap } from "@chakra-ui/react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FaStar } from "react-icons/fa6";
import DOMPurify from "dompurify";
import AddToListButtonForm from "../components/forms/addToListButtonForm";
import LoadingComponent from "../components/common/loading/LoadingComponent";
import RatingInputForm from "../components/forms/ratingInputForm";

export default observer(function AnimeDetails() {
    const { animeStore, listStore, userStore } = useStore()
    const { animeId } = useParams()
    const { selectedAnime } = animeStore
    const {userAnimeDetails} = listStore

    useEffect(() => {
        const loadAnime = async () => {
            if (animeId) {
                await animeStore.loadAnimeDetails(parseInt(animeId, 10))
            }
        }

        loadAnime()

        return () => {
            animeStore.clearSelectedAnime()
        }
    }, [animeId, animeStore])

    useEffect(() => {
        const loadUserAnime = async() => {
            if(userStore.user && selectedAnime){
                await listStore.loadUserAnimeDetails(selectedAnime.id)
            }
        }

        loadUserAnime()

        return() => {
            listStore.clearUserAnimeDetails()
        }
    }, [listStore, selectedAnime, userStore.user])

    const averageScore = selectedAnime?.averageScore ? parseFloat((selectedAnime.averageScore * 0.1).toFixed(1)) : null 

    if(animeStore.isLoadingSelectedAnime){
        return (
            <LoadingComponent text="Loading anime..."/>
        )
    }

    return (
        <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%' >
            <Stack maxWidth='1200px' justifyContent='center' alignItems='center' gap='8rem'>
                <Flex justify='center' wrap='wrap' width='100%' gap='2rem' >
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
                        {userAnimeDetails ? (
                            <Box>
                                <RatingInputForm />
                                <Text>{listStore.userAnimeDetails?.watchStatus}</Text>
                                <Text>{listStore.userAnimeDetails?.numEpisodesWatched}</Text>
                            </Box>
                        ) : (
                            <AddToListButtonForm animeToAdd={animeStore.selectedAnime!}/>
                        )}
                    </Stack>
                </Flex>

                {selectedAnime?.description && 
                    <Stack gap='1rem'>
                        <Heading size='md'>Synopsis</Heading>
                        <Text dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(selectedAnime?.description)}}/>
                    </Stack>
                }
            </Stack>
        </Box>
    )
})