import { Badge, Flex, Grid, GridItem, Heading, Image, Progress, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { UserAnimeDetails } from "../../models/userAnimeDetails";
import { Calendar, Play, Star } from "lucide-react";

interface Props {
    userAnime: UserAnimeDetails
}

export default function AnimeListEntry({ userAnime }: Props) {
    return (
        <NavLink to={`/anime/${userAnime.id}/details`}>
            <Grid gridTemplateColumns="1fr 3fr" bg="background.secondary" rounded="lg" overflow="hidden" w="100%" h="100%">
                <GridItem>
                    <Image src={userAnime.coverImage?.large ?? userAnime.coverImage?.medium} alt={`${userAnime.title} poster`} w="100%" h="100%" objectFit="cover" objectPosition="center" />
                </GridItem>

                <GridItem as={Stack} justifyContent="space-between" padding={4}>
                    <Flex justifyContent="space-between" alignItems="start" gap={4}>
                        <Heading size="lg" lineClamp={2}>{userAnime.title?.english ?? userAnime.title?.romaji}</Heading>
                        <Badge bg="interactive.secondary" color="interactive.primary" size="xs" rounded="full" px={2} py={0}>{userAnime.format}</Badge>
                    </Flex>

                    <Flex alignItems="center" gap={1} color="text.subtle">
                        <Calendar size={12}/>
                        <Text fontSize="sm">{`${userAnime.season && (userAnime.season.charAt(0) + userAnime.season.slice(1).toLowerCase())} ${userAnime.seasonYear}`}</Text>
                    </Flex>

                    <Stack>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Flex alignItems="center" gap={1}>
                                <Play size={12}/>
                                <Text fontSize="sm">{`${userAnime.numEpisodesWatched} / ${userAnime.episodes || "?"}`}</Text>
                            </Flex>

                            <Text fontSize="sm" color="text.subtle">{`${userAnime.episodes ? Math.floor((userAnime.numEpisodesWatched / (userAnime.episodes ?? 0)) * 100) : "?"}%`}</Text>
                        </Flex>

                        <Progress.Root size="sm" min={0} max={userAnime.episodes || (userAnime.numEpisodesWatched === 0 ? Infinity : userAnime.numEpisodesWatched * 2)} value={userAnime.numEpisodesWatched}>
                            <Progress.Track bg="background.secondary" rounded="full" overflow="hidden">
                                <Progress.Range bg="interactive.primary"/>
                            </Progress.Track>
                        </Progress.Root>
                    </Stack>

                    <Flex gap={1} alignItems="center">
                        <Text fontSize="sm" color="text.subtle">Your rating:</Text>
                        <Flex gap={0} alignItems="center">
                            <Star size={12} color="yellow" fill="yellow"/>
                            <Text fontSize="sm">{userAnime.rating}</Text>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
        </NavLink>
    )
}