import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerContent, DrawerOverlay, Heading, HStack, Icon, IconButton, Menu, MenuButton, MenuList, Spacer, useDisclosure } from "@chakra-ui/react";
import { FaBars, FaMagnifyingGlass, FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { navBarHeight, navBarIconSize } from "../../theme";
import NavBarButton from "./NavBarButton";

export default function Navbar() {
    const { isOpen, onClose, onToggle } = useDisclosure()

    return (
        <HStack bg='surface.2' position='fixed' width='100%' height={navBarHeight} paddingX={{ base: '0', md: '4rem' }} gap={0} justify='center' zIndex={11} >
            <IconButton
                aria-label="hamburger-menu"
                icon={<Icon as={FaBars} boxSize={navBarIconSize}/>}
                display={{ base: 'flex', md: 'none' }}
                boxSize={navBarHeight}
                padding='1rem'
                variant='unstyled'
                borderRadius={0}
                border='none'
                boxShadow='none'
                _hover={{ bg: '#141519' }}
                _active={{ bg: '#141519' }}
                onClick={onToggle}
            />

            <Drawer placement="left"isOpen={isOpen} onClose={onClose} size={{base: 'full', sm: 'xs'}} >
                <DrawerOverlay marginTop={navBarHeight} />

                <DrawerContent marginTop={navBarHeight} bg='#141519' boxShadow='none' border='none'>

                </DrawerContent>
            </Drawer>

            <Heading size='sm' padding='1rem' color='#ff640a'>MyAnimeVault</Heading>

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

            <NavBarButton name="search" icon={FaMagnifyingGlass}/>
            <NavBarButton name="list" icon={FaRegBookmark} />
            <NavBarButton name="options" icon={FaRegUser} />
        </HStack>
    )
}