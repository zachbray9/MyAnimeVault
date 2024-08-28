import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerContent, DrawerOverlay, Flex, Heading, HStack, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, useDisclosure } from "@chakra-ui/react";
import { FaBars, FaMagnifyingGlass, FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { navBarHeight, navBarIconSize } from "../../theme";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import Logo from "../../assets/MyAnimeVaultLogo.png"

export default function Navbar() {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { userStore } = useStore()

    return (
        <HStack bg='surface.2' position='fixed' width='100%' height={navBarHeight} paddingX={{ base: '0', md: '4rem' }} gap={0} justify='center' zIndex={11} >
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
            <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={{ base: 'full', sm: 'xs' }} >
                <DrawerOverlay marginTop={navBarHeight} />

                <DrawerContent marginTop={navBarHeight} bg='surface.1' boxShadow='none' border='none'>

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

                </MenuList>
            </Menu>

            <Spacer />

            {/* Search, list, and account menu buttons */}
            <IconButton as={NavLink} to='anime/search' aria-label="search" icon={<Icon as={FaMagnifyingGlass} boxSize={navBarIconSize} />} variant='navbar' />
            <IconButton aria-label="list" icon={<Icon as={FaRegBookmark} boxSize={navBarIconSize} />} variant='navbar' />
            <Menu>
                <MenuButton as={IconButton} aria-label="options" icon={<Icon as={FaRegUser} boxSize={navBarIconSize} />} variant='navbar' />

                { userStore.user ? (
                    <MenuList>
                        <MenuItem>Log Out</MenuItem>
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
}