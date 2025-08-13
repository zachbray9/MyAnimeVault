import { Box, Heading, IconButton, Input, InputGroup, SimpleGrid, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { CloseIcon } from "@chakra-ui/icons";
import useAnimeSearch from "../hooks/useAnimeSearch";
import CarouselCard from "../components/carousels/CarouselCard";

export default observer(function Search() {
    const { query, setQuery, results } = useAnimeSearch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <Stack as="main" alignItems='center' gap={['1.25rem', null, '4rem']}>
            <Box as="section" width='100%' bg='background' display='flex' alignItems='center' justifyContent='center' paddingY={['1.25rem', '2rem']} >
                <InputGroup
                    maxWidth='55rem'
                    paddingX={['1.25rem', '2rem']}
                    endElement={query &&
                        <IconButton aria-label="clear-search" variant='plain' onClick={() => setQuery("")}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    <Input
                        variant='flushed'
                        placeholder="Search..."
                        fontSize={['1.5rem', '1.75rem', '2.125rem']}
                        _focusVisible={{
                            borderColor: 'interactive.primary'
                        }}
                        paddingBottom='0.5rem'
                        value={query}
                        onChange={handleInputChange}

                    />
                </InputGroup>
            </Box>

            {results.length > 0 &&
                <Stack as="section" maxWidth='65rem' width='100%' gap={['1.25rem', null, '2rem']} padding={['1.25rem', null, '4rem']}>
                    <Heading size='lg'>Results</Heading>

                    <SimpleGrid columns={[2, 3, 4]} gap={['1.25rem', '1.75rem', '2.125rem']}>
                        {results.map((anime) => (
                            <CarouselCard key={anime.id} anime={anime} />
                        ))}
                    </SimpleGrid>
                </Stack>
            }
        </Stack>
    )
})