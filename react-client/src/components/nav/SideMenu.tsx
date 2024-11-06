import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import SideMenuButton from "./SideMenuButton";
import { genres, sortValues } from "../../pages/Browse"

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: Props) {
    return (
        <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={{ base: 'full', sm: 'xs' }} trapFocus={false} >
            <DrawerOverlay marginTop={navBarHeight} />

            <DrawerContent marginTop={navBarHeight} bg='surface.1' boxShadow='none' border='none' padding='0px' paddingBottom={navBarHeight} overflowY='scroll'>
                <DrawerHeader color='text.subtle'>Browse</DrawerHeader>
                <DrawerBody as={Stack} paddingX='0px'>
                    {
                        sortValues.map(sortValue => (
                            <SideMenuButton key={sortValue} to={`/anime/browse/${sortValue}`} onClose={onClose} >{sortValue.charAt(0).toUpperCase() + sortValue.slice(1)}</SideMenuButton>
                        ))
                    }
                    <Accordion allowToggle>
                        <AccordionItem border='none' boxShadow='none'>
                            <h2>
                                <AccordionButton _focus={{ background: 'inherit' }}>
                                    <Box flex={1} textAlign='left' fontWeight={500}>Browse</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel as={Stack} background='surface.2' padding='0px' gap={0}>
                                {
                                    genres.map(genre => (

                                        <SideMenuButton key={genre} to={`/anime/browse/${genre}`} onClose={onClose} paddingX="2.5rem" paddingY="1.5rem" >{genre.charAt(0).toUpperCase() + genre.slice(1)}</SideMenuButton>
                                    ))
                                }
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}