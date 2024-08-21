import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack, IconButton, Menu, MenuButton, MenuList, Spacer } from "@chakra-ui/react";
import { FaMagnifyingGlass, FaRegUser } from "react-icons/fa6";

export default function Navbar() {
    return (
        <HStack bg='#23252b' width='100%' height='auto' paddingX='4rem' gap={0} justify='center'>
            <Heading size='sm' padding='1rem' color='#ff640a'>MyAnimeVault</Heading>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant='unstyled'
                    size='sm'
                    padding='1rem'
                    height='auto'
                    width='auto'
                    display='flex'
                    alignItems='center'
                    borderRadius={0}
                    _hover={{ bg: '#1c1e24' }}
                    _active={{ bg: '#1c1e24' }}
                >
                    Browse
                </MenuButton>

                <MenuList>

                </MenuList>
            </Menu>

            <Spacer />

            <IconButton aria-label="search" icon={<FaMagnifyingGlass />} width='auto' height='auto' padding='1rem' borderRadius={0} variant='unstyled' _hover={{ bg: '#1c1e24' }} />
            <IconButton aria-label='options' icon={<FaRegUser />} width='auto' height='auto' padding='1rem' borderRadius={0} variant='unstyled' _hover={{ bg: '#1c1e24' }} />

        </HStack>
    )
}