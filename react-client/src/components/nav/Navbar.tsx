import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerContent, DrawerOverlay, Heading, HStack, IconButton, Menu, MenuButton, MenuList, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { FaBars, FaMagnifyingGlass, FaRegUser } from "react-icons/fa6";

export default function Navbar() {
    const { isOpen, onClose, onToggle } = useDisclosure()

    return (
        <HStack bg='#23252b' position='fixed' width='100%' height='3rem' paddingX={{ base: '0', md: '4rem' }} gap={0} justify='center' zIndex={11} >
            <IconButton
                aria-label="hamburger-menu"
                icon={<FaBars />}
                display={{ base: 'flex', md: 'none' }}
                size='sm'
                width='auto'
                height='100%'
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
                <DrawerOverlay marginTop='3rem' />

                <DrawerContent marginTop='3rem' bg='#141519' boxShadow='none' border='none'>

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

            <IconButton aria-label="search" icon={<FaMagnifyingGlass />} width='auto' height='100%' padding='1rem' borderRadius={0} variant='unstyled' _hover={{ bg: '#141519' }} />
            <IconButton aria-label='options' icon={<FaRegUser />} width='auto' height='100%' padding='1rem' borderRadius={0} variant='unstyled' _hover={{ bg: '#141519' }} />

        </HStack>
    )
}