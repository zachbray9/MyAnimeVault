import { Flex, Heading, IconButton, Image, Menu, Spacer, useDisclosure } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import { NavLink } from "react-router-dom";
import { useStore } from "../../stores/store";
import Logo from "../../assets/PlotArmorLogo.png"
import { observer } from "mobx-react-lite";
import SideMenu from "./SideMenu";
import BrowseMenu from "./BrowseMenu";
import { Bookmark, Search, User, Menu as MenuIcon } from "lucide-react";

export default observer(function Navbar() {
    const { open, onClose, onToggle } = useDisclosure()
    const { userStore } = useStore()

    return (
        <Flex bg='background.card' position='fixed' width='100%' minWidth="fit-content" height={navBarHeight} paddingX={{ base: '0', md: '4rem' }} gap={4} alignItems="center" zIndex={100} >
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
                _hover={{ bg: 'background.secondary' }}
                _active={{ bg: 'background.secondary' }}
                onClick={onToggle}
            >
                <MenuIcon />
            </IconButton>

            {/* Menu for small screens */}
            <SideMenu isOpen={open} onClose={onClose} />

            {/* Logo */}
            <Flex flexShrink={0} minWidth="fit-content">
                <NavLink to="">
                    <Flex align='center' gap='0.5rem'>
                        <Image src={Logo} boxSize='2.75rem' />
                        <Heading size='md' fontWeight="bold" display={['none', 'flex']} color='text'>PlotArmor</Heading>
                    </Flex>
                </NavLink>
            </Flex>

            {/* Browse Menu */}
            <Flex flexShrink={1} h="100%">
                <BrowseMenu />
            </Flex>

            <Spacer />

            {/* Search, list, and account menu buttons */}
            <Flex gap={0} h="100%" flexShrink={0} minWidth="fit-content">
                <IconButton asChild aria-label="search" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "background"}}>
                    <NavLink to="anime/search">
                        <Search />
                    </NavLink>
                </IconButton>

                <IconButton asChild aria-label="list" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "background"}}>
                    <NavLink to="anime/list">
                        <Bookmark />
                    </NavLink>
                </IconButton>

                <Menu.Root>
                    <Menu.Trigger asChild aria-label="options" >
                        <IconButton aria-label="options" h="100%" aspectRatio="1/1" bg="transparent" color="text" _hover={{bg: "background"}}>
                            <User />
                        </IconButton>
                    </Menu.Trigger>

                    <Menu.Positioner>
                        <Menu.Content bg="background.secondary">
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
            </Flex>
        </Flex >
    )
})