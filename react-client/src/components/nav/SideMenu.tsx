import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import SideMenuButton from "./SideMenuButton";

interface Props{
    isOpen: boolean
    onClose: () => void
}

export default function SideMenu({isOpen, onClose} : Props){
    return (
        <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={{ base: 'full', sm: 'xs' }} trapFocus={false} >
                <DrawerOverlay marginTop={navBarHeight} />

                <DrawerContent marginTop={navBarHeight} bg='surface.1' boxShadow='none' border='none' padding='0px'>
                    <DrawerHeader color='text.subtle'>Browse</DrawerHeader>
                    <DrawerBody as={Stack} paddingX='0px'>
                        <SideMenuButton>New</SideMenuButton>
                        <SideMenuButton>Popular</SideMenuButton>
                        <Accordion allowToggle>
                            <AccordionItem border='none' boxShadow='none'>
                                <h2>
                                    <AccordionButton _focus={{background: 'inherit'}}>
                                        <Box flex={1} textAlign='left' fontWeight={500}>Browse</Box>
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
    )
}