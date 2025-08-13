import { Accordion, AccordionItemIndicator, CloseButton, Drawer, Portal, Span, Stack } from "@chakra-ui/react";
import { navBarHeight } from "../../theme";
import SideMenuButton from "./SideMenuButton";
import { genres, sortValues } from "../../pages/Browse"

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: Props) {
    return (
        <Drawer.Root placement="start" open={isOpen} size={{ base: 'full', sm: 'xs' }} onInteractOutside={onClose}>
            <Portal >
                <Drawer.Backdrop mt={navBarHeight} />
                <Drawer.Positioner >
                    <Drawer.Content mt={navBarHeight}>
                        <Drawer.Header>
                            <Drawer.Title color='text.subtle'>Browse</Drawer.Title>
                        </Drawer.Header>

                        <Drawer.Body as={Stack}  overflow="auto" pb={navBarHeight}>
                            {
                                sortValues.map(sortValue => (
                                    <SideMenuButton key={sortValue} to={`/anime/browse/${sortValue}`} onClose={onClose} >{sortValue.charAt(0).toUpperCase() + sortValue.slice(1)}</SideMenuButton>
                                ))
                            }

                            <Accordion.Root collapsible px="1rem" >
                                <Accordion.Item value="Browse">
                                    <Accordion.ItemTrigger>
                                        <Span flex="1">Browse</Span>
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
                            <CloseButton size="sm" onClick={onClose} />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}