import { Box, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AnimeListEntry from "../components/animeList/animeListEntry";
import FilterSection from "../components/animeList/filterSection";

export default observer(function List() {
    const { listStore } = useStore()

    useEffect(() => {
        listStore.loadList()

        return () => {
            listStore.clearList()
        }
    }, [listStore])

    return (
        <>
            <Helmet>
                <title>Anime List - MyAnimeVault</title>
            </Helmet>

            <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%'>
                <Stack maxWidth='1600px' width='100%' justifyContent='start' alignItems='start' gap={['1rem', '1.5rem', '4rem']}>
                    <Heading>My list</Heading>

                    <Grid templateColumns={['1fr', null, '1fr 3fr', '1fr 5fr']} gap='2rem' width='100%'>
                        <GridItem>
                            <FilterSection />
                        </GridItem>

                        <GridItem>
                            <Stack gap={['1rem', '1.25rem', '2rem']} width='100%'>
                                {listStore.filteredList?.map(userAnime => (
                                    <AnimeListEntry userAnime={userAnime} key={userAnime.id}/>
                                ))}
                            </Stack>
                        </GridItem>
                        
                    </Grid>
                </Stack>
            </Box>
        </>
    )
})