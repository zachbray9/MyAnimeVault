import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { CharacterEdge } from "../../models/characterEdge";

interface Props {
    character: CharacterEdge
}

export default function CharacterCard({ character }: Props) {
    return (
        <Box height='fit-content' width='100%' bg='surface.1' overflow='hidden'>
            <Grid templateColumns='1fr 1fr' gap={2}>
                <GridItem display='flex'>
                    <Grid templateColumns='60px auto'>
                        <GridItem>
                            <Image src={character.node.image.large} objectFit='cover' height='90px' aspectRatio={2/3}/>
                        </GridItem>

                        <GridItem display='flex' flexDirection='column' justifyContent='space-between' padding={2}>
                            <Text fontSize='sm'>{character.node.name.full}</Text>
                            <Text fontSize='xs'>{character.role}</Text>
                        </GridItem>
                    </Grid>
                </GridItem>

                <GridItem display='flex' justifyContent='end'>
                    <Grid templateColumns='auto 60px'>
                        <GridItem display='flex' flexDirection='column' alignItems='end' justifyContent='space-between' padding={2}>
                            <Text fontSize='sm' align='right'>{character.voiceActors[0]?.name.full}</Text>
                            <Text fontSize='xs'>{character.voiceActors[0]?.language}</Text>
                        </GridItem>

                        <GridItem>
                            <Image src={character.voiceActors[0]?.image.large} objectFit='cover' height='90px' aspectRatio={2/3}/>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </Box>
    )
}