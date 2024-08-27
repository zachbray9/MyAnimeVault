import { Box, Heading, Image, Input, InputGroup, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default observer(function Search() {
    const { animeStore } = useStore()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        animeStore.loadSearchResults(event.target.value)
    }

    useEffect(() => {
        return () => {
            animeStore.clearSearchResults()
        }
    }, [animeStore])

    return (
        <Stack alignItems='center' gap={['1.25rem', null, '4rem']}>
            <Box width='100%' bg='surface.1' display='flex' alignItems='center' justifyContent='center' paddingY={['1.25rem', '2rem']} >
                <InputGroup maxWidth='55rem' paddingX={['1.25rem', '2rem']} >
                    <Input
                        variant='flushed'
                        placeholder="Search..."
                        fontSize={['1.5rem', '1.75rem', '2.125rem']}
                        _focusVisible={{
                            borderColor: 'primary.base'
                        }}
                        paddingBottom='0.5rem'
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Box>

            {animeStore.searchResults.length > 0 &&
                <Stack maxWidth='65rem' width='100%' gap={['1.25rem', null, '2rem']} padding={['1.25rem', null, '4rem']}>
                    <Heading size='lg'>Results</Heading>

                    <SimpleGrid columns={[2, 3, 4]} spacing={['1.25rem', '1.75rem', '2.125rem']}>
                        {animeStore.searchResults.map((anime) => (
                            <Stack key={anime.id} as={NavLink} to={`/anime/${anime.id}/details`} maxWidth='200px' >
                                <Image src={anime.coverImage.large} aspectRatio='2/3' objectFit='contain' width='100%' />
                                <Text fontSize='sm'>{anime.title.english || anime.title.romaji}</Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Stack>
            }
        </Stack>
    )
})