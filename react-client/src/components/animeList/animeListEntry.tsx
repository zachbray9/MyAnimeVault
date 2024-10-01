import { Flex, Heading, Image, Progress, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { UserAnimeDetails } from "../../models/userAnimeDetails";
import { FaStar } from "react-icons/fa6";

interface Props {
    userAnime: UserAnimeDetails
}

export default function AnimeListEntry({ userAnime }: Props) {
    const imageHeight = ['150px', '225px', '300px']

    return (
        <Flex as={NavLink} to={`/anime/${userAnime.id}/details`} key={userAnime.id} width='100%' justify='start' gap={['1.5rem', '1.75rem', '2rem']} padding={['1rem', '1.25rem', '1.5rem']} _hover={{ bg: 'surface.1' }}>
            <Image src={userAnime.coverImage?.large} aspectRatio='2/3' boxSize={imageHeight} objectFit='contain' />
            <Stack width='100%' justify='space-between'>
                <Stack>
                    <Heading size={['sm', 'md', 'lg']}>{userAnime.title?.english || userAnime.title?.romaji}</Heading>
                    <Text fontSize={['xs', 'sm', 'md']} color='text.subtle'>{`${userAnime.format}, ${userAnime.season} ${userAnime.seasonYear}`}</Text>
                </Stack>

                <Stack>
                    <Progress size={['sm', 'md', 'lg']} color='primary.base' min={0} max={userAnime.episodes || (userAnime.numEpisodesWatched === 0 ? Infinity : userAnime.numEpisodesWatched * 2)} value={userAnime.numEpisodesWatched} />
                    <Flex justify='space-between'>
                        <Text fontSize={['xs', 'sm', 'md']} display='flex' alignItems='center' gap={1}><FaStar color="yellow" /> {userAnime.rating}</Text>
                        <Text fontSize={['xs', 'sm', 'md']}>{`${userAnime.numEpisodesWatched} / ${userAnime.episodes || '?'} ep`}</Text>
                    </Flex>
                </Stack>
            </Stack>
        </Flex>
    )
}