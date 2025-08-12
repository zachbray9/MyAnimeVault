import { Accordion, AccordionItemIndicator, CloseButton, Drawer, Portal, Stack } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import SideMenuButton from "./SideMenuButton";
import { genres, sortValues } from "../../pages/Browse"

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: Props) {
    return (
        <Drawer.Root placement="start" open={isOpen} size={{ base: 'full', sm: 'xs' }} >
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content mt={navBarHeight}>
                        <Drawer.Header>
                            <Drawer.Title color='text.subtle'>Browse</Drawer.Title>
                        </Drawer.Header>

                        <Drawer.Body as={Stack} px={navBarHeight}>
                            {
                                sortValues.map(sortValue => (
                                    <SideMenuButton key={sortValue} to={`/anime/browse/${sortValue}`} onClose={onClose} >{sortValue.charAt(0).toUpperCase() + sortValue.slice(1)}</SideMenuButton>
                                ))
                            }

                            <Accordion.Root>
                                <Accordion.Item value="Browse">
                                    <Accordion.ItemTrigger>
                                        <AccordionItemIndicator />
                                    </Accordion.ItemTrigger>

                                    <Accordion.ItemContent>
                                        <Accordion.ItemBody as={Stack} background="surface.2">
                                            {
                                                genres.map(genre => (
                                                    <SideMenuButton key={genre} to={`/anime/browse/${genre}`} onClose={onClose} paddingX="2.5rem" paddingY="1.5rem" >{genre.charAt(0).toUpperCase() + genre.slice(1)}</SideMenuButton>
                                                ))
                                            }
                                        </Accordion.ItemBody>
                                    </Accordion.ItemContent>
                                </Accordion.Item>
                            </Accordion.Root>
                        </Drawer.Body>

                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
            {/* <DrawerOverlay marginTop={navBarHeight} /> */}

            {/* <DrawerContent marginTop={navBarHeight} bg='surface.1' boxShadow='none' border='none' padding='0px' paddingBottom={navBarHeight} overflowY='scroll'>
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
            </DrawerContent> */}
        </Drawer.Root>
    )
}