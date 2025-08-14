import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AniListAnime } from "../models/aniListAnime";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import CarouselCard from "../components/carousels/CarouselCard";
import '../styles/CarouselCard.css'

export default observer(function Browse() {
    const { category = 'trending' } = useParams()
    const navigate = useNavigate()
    const [animeList, setAnimeList] = useState<AniListAnime[]>([])
    const { animeStore } = useStore()
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

    useEffect(() => {
        const fetchAnimes = async (category: string) => {
            let genre: string | undefined = undefined
            let sortBy: string = 'trending'


            if (genres.includes(category)) {
                genre = category
            }
            else if (sortValues.includes(category)) {
                sortBy = category
            }

            const animes = await animeStore.loadAnimeCategory(genre, sortBy)
            setAnimeList(animes)
        }

        fetchAnimes(category)
    }, [animeStore, category, navigate])

    if (!genres.includes(category) && !sortValues.includes(category))
        return <Navigate to='/404' />

    return (
        <>
            <Helmet>
                <title>{`${formattedCategory} Anime Shows and Movies - PlotArmor`}</title>
            </Helmet>

            <Box display='flex' justifyContent='center' width='100%'>
                <Stack alignItems='center' maxWidth='1200px' width='100%' gap='1.5rem' paddingX={['1rem', '1.5rem', '2rem', '4rem']} paddingY={['1rem', '1.25rem', '2rem']}>
                    <Stack width='100%' alignItems='center'>
                        <Heading>{formattedCategory}</Heading>
                        {category && <Text>{categoryDescriptionMap.get(category)}</Text>}
                    </Stack>

                    <Grid
                        templateColumns={{
                            base: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                            lg: 'repeat(5, 1fr)',
                            xl: 'repeat(6, 1fr)', 
                            xlTo2xl: 'repeat(7, 1fr)'
                        }}
                        gap={['1rem', '1.5rem', '2rem']}
                    >
                        {animeList.map((anime) => (
                            <CarouselCard key={anime.id} anime={anime} />
                        ))}
                    </Grid>
                </Stack>
            </Box >
        </>
    )
})

export const genres = [
    'action',
    'adventure',
    'comedy',
    'drama',
    'ecchi',
    'fantasy',
    'horror',
    'mahou shoujo',
    'mecha',
    'music',
    'mystery',
    'psychological',
    'romance',
    'sci-fi',
    'slice of life',
    'sports',
    'supernatural',
    'thriller'
]

export const sortValues = [
    'new',
    'popular',
    'trending'
]

const categoryDescriptionMap = new Map<string, string>([
    ['new', 'Fresh releases hot off the press!'],
    ['popular', "10/10's that everybody loves!"],
    ['trending', "Trending favorites everyone's watching!"],
    ['action', 'For all your fist flying, explosion-filled needs!'],
    ['adventure', 'Epic quests and thrilling journeys await!'],
    ['comedy', 'Laugh out loud with hilarious antics!'],
    ['drama', 'Intense emotions and complex relationships.'],
    ['ecchi', 'Flirty, funny, and a bit daring!'],
    ['fantasy', 'Magic, mythical worlds, and epic battles!'],
    ['horror', 'Spine-chilling thrills and eerie encounters.'],
    ['mahou shoujo', 'Magic, friendship, and unstoppable courage!'],
    ['mecha', 'Giant robots, high-tech battles, and heroism!'],
    ['music', 'Feel the rhythm, live the melody!'],
    ['mystery', 'Puzzles, secrets, and mind-bending twists.'],
    ['psychological', 'Dive into the mind games and mysteries.'],
    ['romance', 'Heartfelt stories of love and connection.'],
    ['sci-fi', 'Futuristic tech, space odysseys, and beyond!'],
    ['slice of life', 'Everyday stories, real emotions.'],
    ['sports', 'For the thrill of victory and teamwork!'],
    ['supernatural', 'Ghosts, spirits, and the otherworldly!'],
    ['thriller', 'Edge-of-your-seat suspense and tension!'],
])