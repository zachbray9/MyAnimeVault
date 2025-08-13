import { Flex, Heading, HStack, IconButton, Image, Menu, Spacer, useDisclosure } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import Logo from "../../assets/MyAnimeVaultLogo.png"
import { observer } from "mobx-react-lite";
import SideMenu from "./SideMenu";
import BrowseMenu from "./BrowseMenu";
import { Bookmark, Search, User, Menu as MenuIcon } from "lucide-react";

export default observer(function Navbar() {
    const { open, onClose, onToggle } = useDisclosure()
    const { userStore } = useStore()

    return (
        <HStack bg='surface.2' position='fixed' width='100%' height={navBarHeight} paddingX={{ base: '0', md: '4rem' }} gap={0} justify='center' zIndex={100} >
            {/* Hamburger menu button for small screens */}
            <IconButton
                aria-label="hamburger-menu"
                display={{ base: 'flex', md: 'none' }}
                boxSize={navBarHeight}
                padding='1rem'
                variant='plain'
                borderRadius={0}
                border='none'
                boxShadow='none'
                _hover={{ bg: 'surface.1' }}
                _active={{ bg: 'surface.1' }}
                onClick={onToggle}
            >
                <MenuIcon />
            </IconButton>

            {/* Menu for small screens */}
            <SideMenu isOpen={open} onClose={onClose} />

            {/* Logo */}
            <NavLink to="">
                <Flex align='center' gap='0.5rem' padding='1rem'>
                    <Image src={Logo} boxSize='1.75rem' />
                    <Heading size='sm' display={['none', 'flex']} color='primary.base'>MyAnimeVault</Heading>
                </Flex>
            </NavLink>

            {/* Browse Menu */}
            <BrowseMenu />

            <Spacer />

            {/* Search, list, and account menu buttons */}
            <IconButton asChild aria-label="search" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "surface.1"}}>
                <NavLink to="anime/search">
                    <Search />
                </NavLink>
            </IconButton>

            <IconButton asChild aria-label="list" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "surface.1"}}>
                <NavLink to="anime/list">
                    <Bookmark />
                </NavLink>
            </IconButton>

            <Menu.Root>
                <Menu.Trigger asChild aria-label="options" >
                    <IconButton aria-label="options" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "surface.1"}}>
                        <User />
                    </IconButton>
                </Menu.Trigger>

                <Menu.Positioner>
                    <Menu.Content>
                        {userStore.user ? (
                            <Menu.ItemGroup>
                                <Menu.Item value="logout" onClick={() => userStore.logout()}>Log Out</Menu.Item>
                            </Menu.ItemGroup>
                        ) : (
                            <Menu.ItemGroup>
                                <Menu.Item asChild value="register">
                                    <NavLink to="/register">Create Account</NavLink>
                                </Menu.Item>
                                <Menu.Item asChild value="login" >
                                    <NavLink to="/login">Log In</NavLink>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        )}
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        </HStack >
    )
})