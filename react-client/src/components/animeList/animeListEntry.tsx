import { Badge, Flex, Grid, GridItem, Heading, Image, Progress, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { UserAnimeDetails } from "../../models/userAnimeDetails";
import { Calendar, Play, Star } from "lucide-react";

interface Props {
    userAnime: UserAnimeDetails
}

export default function AnimeListEntry({ userAnime }: Props) {
    const imageHeight = ['100px', '150px', '225px']

    return (
        <NavLink to={`/anime/${userAnime.id}/details`}>
            <Grid gridTemplateColumns="1fr 3fr" bg="background.secondary" rounded="lg" overflow="hidden" w="fit-content">
                <GridItem>
                    <Image src={userAnime.coverImage?.large ?? userAnime.coverImage?.medium} alt={`${userAnime.title} poster`} maxH="150px"/>
                </GridItem>

                <GridItem as={Stack} justifyContent="space-between" padding={4}>
                    <Flex justifyContent="space-between">
                        <Heading size="lg">{userAnime.title?.english ?? userAnime.title?.romaji}</Heading>
                        <Badge bg="interactive.secondary" color="interactive.primary" size="xs" rounded="full" px={4} py={0}>{userAnime.format}</Badge>
                    </Flex>

                    <Flex alignItems="center" gap={1}>
                        <Calendar size={12}/>
                        <Text fontSize="sm">{`${userAnime.season && (userAnime.season.charAt(0) + userAnime.season.slice(1).toLowerCase())} ${userAnime.seasonYear}`}</Text>
                    </Flex>

                    <Stack>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Flex alignItems="center" gap={1}>
                                <Play size={12}/>
                                <Text fontSize="sm">{`${userAnime.numEpisodesWatched} / ${userAnime.episodes || "?"}`}</Text>
                            </Flex>

                            <Text fontSize="sm">{`${userAnime.episodes ? Math.floor((userAnime.numEpisodesWatched / (userAnime.episodes ?? 0)) * 100) : "?"}%`}</Text>
                        </Flex>

                        <Progress.Root size="sm" min={0} max={userAnime.episodes || (userAnime.numEpisodesWatched === 0 ? Infinity : userAnime.numEpisodesWatched * 2)} value={userAnime.numEpisodesWatched}>
                            <Progress.Track bg="background.secondary" rounded="full" overflow="hidden">
                                <Progress.Range bg="interactive.primary"/>
                            </Progress.Track>
                        </Progress.Root>
                    </Stack>

                    <Flex gap={1} alignItems="center">
                        <Text fontSize="sm">Your rating:</Text>
                        <Flex gap={0} alignItems="center">
                            <Star size={12} color="yellow" fill="yellow"/>
                            <Text fontSize="sm">{userAnime.rating}</Text>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            {/* <Flex key={userAnime.id} width='100%' justify='start' gap={['1.5rem', '1.75rem', '2rem']} padding={['0.5rem', '0.75rem', '1rem']} _hover={{ bg: 'background.secondary' }}>
                <Image src={userAnime.coverImage?.large} aspectRatio='2/3' boxSize={imageHeight} objectFit='contain' />
                <Stack width='100%' justify='space-between'>
                    <Stack>
                        <Heading size={['sm', 'md']}>{userAnime.title?.english || userAnime.title?.romaji}</Heading>
                        <Text fontSize={['xs', 'sm']} color='text.subtle'>{`${userAnime.format}, ${userAnime.season} ${userAnime.seasonYear}`}</Text>
                    </Stack>

                    <Stack>
                        <Progress.Root size={['sm', 'md', 'lg']} min={0} max={userAnime.episodes || (userAnime.numEpisodesWatched === 0 ? Infinity : userAnime.numEpisodesWatched * 2)} value={userAnime.numEpisodesWatched} >
                            <Progress.Track bg="background.secondary">
                                <Progress.Range bg="interactive.primary"/>
                            </Progress.Track>
                        </Progress.Root>

                        <Flex justify='space-between'>
                            <Text fontSize={['xs', 'sm', 'md']} display='flex' alignItems='center' gap={1}><Star color="yellow" /> {userAnime.rating}</Text>
                            <Text fontSize={['xs', 'sm', 'md']}>{`${userAnime.numEpisodesWatched} / ${userAnime.episodes || '?'} ep`}</Text>
                        </Flex>
                    </Stack>
                </Stack>
            </Flex> */}
        </NavLink>
    )
}