import { Box, Grid, GridItem, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
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

    const filteredList = listStore.filteredList

    return (
        <>
            <Helmet>
                <title>Anime List - PlotArmor</title>
            </Helmet>

            <Box padding={['1.25rem', null, '4rem']} display='flex' alignItems='start' justifyContent='center' width='100%'>
                <Stack maxWidth='1600px' width='100%' justifyContent='start' alignItems='start' gap={['1rem', '1.5rem', '4rem']}>
                    <Heading>My list</Heading>

                    <Grid templateColumns={['1fr', null, '1fr 3fr', '1fr 5fr']} gap='2rem' width='100%'>
                        <GridItem>
                            <FilterSection />
                        </GridItem>

                        <GridItem as={Stack} alignItems='end' gap='1rem'>
                            <Text color='text.subtle'>{`${filteredList.length} entries`}</Text>

                            <Grid gridTemplateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xlOnly: "repeat(4, 1fr)", xlTo2xl: "repeat(5, 1fr)"}} gap={4} alignItems="stretch" width='100%'>
                                {listStore.isLoadingList ? (
                                        Array.from({ length: 5 }).map((_, index) => (
                                            <Skeleton key={index} w="100%" h="200px" rounded="lg"/>
                                        ))
                                ) : (
                                    filteredList.map(userAnime => (
                                        <AnimeListEntry userAnime={userAnime} key={userAnime.id} />
                                    ))
                                )}
                            </Grid>
                        </GridItem>

                    </Grid>
                </Stack>
            </Box>
        </>
    )
})