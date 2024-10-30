import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";

export default function BrowseMenu(){
    return (
        <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    display={{ base: 'none', md: 'flex' }}
                    variant='unstyled'
                    size='sm'
                    padding='1rem'
                    height='100%'
                    width='auto'
                    alignItems='center'
                    borderRadius={0}
                    _hover={{ bg: '#141519' }}
                    _active={{ bg: '#141519' }}
                >
                    Browse
                </MenuButton>

                <MenuList>
                    <Grid width='600px' templateColumns='1fr 3fr'>
                        <Box maxWidth='300px'>
                            <MenuGroup>
                                <MenuItem>New</MenuItem>
                                <MenuItem>Popular</MenuItem>
                            </MenuGroup>
                        </Box>

                        <Box borderLeft='.125rem solid #23252b'>
                            <MenuGroup title="Genres" color='text.subtle'>
                                <Grid templateColumns='repeat(3, 1fr)' columnGap='1rem'>
                                    <MenuItem>Action</MenuItem>
                                    <MenuItem>Adventure</MenuItem>
                                    <MenuItem>Comedy</MenuItem>
                                    <MenuItem>Drama</MenuItem>
                                    <MenuItem>Fantasy</MenuItem>
                                    <MenuItem>Horror</MenuItem>
                                    <MenuItem>Mystery</MenuItem>
                                    <MenuItem>Romance</MenuItem>
                                    <MenuItem>Sci-Fi</MenuItem>
                                    <MenuItem>Slice of Life</MenuItem>
                                    <MenuItem>Sports</MenuItem>
                                    <MenuItem>Supernatural</MenuItem>
                                </Grid>
                            </MenuGroup>
                        </Box>
                    </Grid>
                </MenuList>
            </Menu>
    )
}