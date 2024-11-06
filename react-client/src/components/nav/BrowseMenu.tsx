import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
                                <MenuItem as={NavLink} to='/anime/browse/new'>New</MenuItem>
                                <MenuItem as={NavLink} to='/anime/browse/popular'>Popular</MenuItem>
                                <MenuItem as={NavLink} to='/anime/browse/trending'>Trending</MenuItem>
                            </MenuGroup>
                        </Box>

                        <Box borderLeft='.125rem solid #23252b'>
                            <MenuGroup title="Genres" color='text.subtle'>
                                <Grid templateColumns='repeat(3, 1fr)' columnGap='1rem'>
                                    <MenuItem as={NavLink} to='/anime/browse/action'>Action</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/adventure'>Adventure</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/comedy'>Comedy</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/drama'>Drama</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/ecchi'>Ecchi</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/fantasy'>Fantasy</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/horror'>Horror</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/mahou shoujo'>Majou Shoujo</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/mecha'>Mecha</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/music'>Music</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/mystery'>Mystery</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/psychological'>Psychological</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/romance'>Romance</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/sci-fi'>Sci-Fi</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/slice of life'>Slice of Life</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/sports'>Sports</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/supernatural'>Supernatural</MenuItem>
                                    <MenuItem as={NavLink} to='/anime/browse/thriller'>Thriller</MenuItem>
                                </Grid>
                            </MenuGroup>
                        </Box>
                    </Grid>
                </MenuList>
            </Menu>
    )
}