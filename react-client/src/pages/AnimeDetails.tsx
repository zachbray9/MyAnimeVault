import { Badge, Box, Button, Flex, Heading, Icon, Image, Stack, Text, useToast, Wrap } from "@chakra-ui/react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FaPlus, FaStar } from "react-icons/fa6";
import DOMPurify from "dompurify";
import { Form, Formik } from "formik";

export default observer(function AnimeDetails() {
    const { animeStore, userStore } = useStore()
    const { animeId } = useParams()
    const toast = useToast()
    const { selectedAnime } = animeStore

    useEffect(() => {
        if (animeId) {
            animeStore.loadAnimeDetails(parseInt(animeId, 10))
        }

        return () => {
            animeStore.clearSelectedAnime()
        }
    }, [animeId, animeStore])

    const averageScore = selectedAnime?.averageScore ? parseFloat((selectedAnime.averageScore * 0.1).toFixed(1)) : null 

    return (
        <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%' >
            <Stack maxWidth='1200px' justifyContent='center' alignItems='center' gap='8rem'>
                <Flex justify='center' wrap='wrap' width='100%' gap='2rem' >
                    <Image src={selectedAnime?.coverImage.large} aspectRatio='2/3' />
                    <Stack gap={4}>
                        <Heading size='lg'>{selectedAnime?.title.english || selectedAnime?.title.romaji}</Heading>
                        <Wrap>
                            {selectedAnime?.genres && selectedAnime.genres.map(genre => (
                                <Badge variant='subtle' borderRadius={14} width='fit-content' paddingX={2} color='gray.500' fontSize='xs'>{genre}</Badge>
                            ))}
                        </Wrap>
                        <Text fontSize='xs' color='text.subtle'>{`${selectedAnime?.format} | ${selectedAnime?.season} ${selectedAnime?.seasonYear}`}</Text>
                        <Flex align='center' justify='start' gap={1}>
                            <Icon as={FaStar} boxSize='1.5rem' color='yellow' />
                            <Text fontSize='1.25rem'>{averageScore || 'Unscored'}</Text>
                        </Flex>

                        <Formik
                            initialValues={{anime: animeStore.selectedAnime}}
                            onSubmit={(values) => userStore.addAnimeToList(values.anime!)
                                .catch(() => toast({title: 'Error', description: "There was a problem adding this anime to your list.", status: 'error', duration: 5000, isClosable: true}))}
                        >
                            {({handleSubmit, isSubmitting}) => (
                                <Form onSubmit={handleSubmit}>
                                    <Button type="submit" variant='solid' isLoading={isSubmitting} width='fit-content' rightIcon={<FaPlus />}>Add to list</Button>
                                </Form>
                            )}
                        </Formik>
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