import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { CharacterEdge } from "../../models/characterEdge";

interface Props {
    character: CharacterEdge
}

export default function CharacterCard({ character }: Props) {
    return (
        <Box maxHeight='300px' height='100%' maxWidth='400px' width='100%' bg='surface.1' overflow='hidden'>
            <Grid templateColumns='1fr 1fr'>
                <GridItem display='flex'>
                    <Grid templateColumns='60px auto'>
                        <GridItem>
                            <Image src={character.node.image.large} objectFit='cover' />
                        </GridItem>

                        <GridItem display='flex' flexDirection='column' justifyContent='space-between' padding={1}>
                            <Text fontSize='sm'>{character.node.name.full}</Text>
                            <Text fontSize='xs'>{character.role}</Text>
                        </GridItem>
                    </Grid>
                </GridItem>

                <GridItem display='flex' justifyContent='end'>
                    <Grid templateColumns='auto 60px'>
                        <GridItem display='flex' flexDirection='column' alignItems='end' justifyContent='space-between' padding={1}>
                            <Text fontSize='sm' align='right'>{character.node.name.full}</Text>
                            <Text fontSize='xs'>{character.role}</Text>
                        </GridItem>

                        <GridItem>
                            <Image src={character.node.image.large} objectFit='cover' />
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </Box>
    )
}