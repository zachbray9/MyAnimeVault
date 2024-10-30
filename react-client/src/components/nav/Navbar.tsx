import { ChevronDownIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, Heading, HStack, Icon, IconButton, Image, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { FaBars, FaMagnifyingGlass, FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { navBarHeight, navBarIconSize } from "../../theme";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import Logo from "../../assets/MyAnimeVaultLogo.png"
import { observer } from "mobx-react-lite";
import SideMenuButton from "./SideMenuButton";

export default observer(function Navbar() {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { userStore } = useStore()

    return (
        <HStack bg='surface.2' position='fixed' width='100%' height={navBarHeight} paddingX={{ base: '0', md: '4rem' }} gap={0} justify='center' zIndex={9999} >
            {/* Hamburger menu button for small screens */}
            <IconButton
                aria-label="hamburger-menu"
                icon={<Icon as={FaBars} boxSize={navBarIconSize} />}
                display={{ base: 'flex', md: 'none' }}
                boxSize={navBarHeight}
                padding='1rem'
                variant='unstyled'
                borderRadius={0}
                border='none'
                boxShadow='none'
                _hover={{ bg: 'surface.1' }}
                _active={{ bg: 'surface.1' }}
                onClick={onToggle}
            />

            {/* Menu for small screens */}
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={{ base: 'full', sm: 'xs' }} trapFocus={false}>
                <DrawerOverlay marginTop={navBarHeight} />

                <DrawerContent marginTop={navBarHeight} bg='surface.1' boxShadow='none' border='none' padding='0px'>
                    <DrawerHeader color='text.subtle'>Browse</DrawerHeader>
                    <DrawerBody as={Stack} paddingX='0px'>
                        <SideMenuButton>New</SideMenuButton>
                        <SideMenuButton>Popular</SideMenuButton>
                        <Accordion allowToggle>
                            <AccordionItem border='none' boxShadow='none'>
                                <h2>
                                    <AccordionButton>
                                        <Box flex={1} textAlign='left'>Browse</Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel as={Stack} background='surface.2' padding='0px' gap={0}>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Action</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Adventure</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Comedy</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Drama</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Fantasy</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Horror</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Mystery</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Romance</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Sci-Fi</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Slice of Life</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Sports</SideMenuButton>
                                    <SideMenuButton paddingX="2.5rem" paddingY="1.5rem">Supernatural</SideMenuButton>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Logo */}
            <Flex as={NavLink} to={''} align='center' gap='0.5rem' padding='1rem'>
                <Image src={Logo} boxSize='1.75rem' />
                <Heading size='sm' display={['none', 'flex']} color='primary.base'>MyAnimeVault</Heading>
            </Flex>

            {/* Browse Menu */}
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

            <Spacer />

            {/* Search, list, and account menu buttons */}
            <IconButton as={NavLink} to='anime/search' aria-label="search" icon={<Icon as={FaMagnifyingGlass} boxSize={navBarIconSize} />} variant='navbar' />
            <IconButton as={NavLink} to={'anime/list'} aria-label="list" icon={<Icon as={FaRegBookmark} boxSize={navBarIconSize} />} variant='navbar' />
            <Menu>
                <MenuButton as={IconButton} aria-label="options" icon={<Icon as={FaRegUser} boxSize={navBarIconSize} />} variant='navbar' />

                {userStore.user ? (
                    <MenuList>
                        <MenuItem onClick={() => userStore.logout()} >Log Out</MenuItem>
                    </MenuList>
                ) : (
                    <MenuList>
                        <MenuItem as={NavLink} to='/register'>Create Account</MenuItem>
                        <MenuItem as={NavLink} to='/login' >Log In</MenuItem>
                    </MenuList>
                )}
            </Menu>
        </HStack>
    )
})