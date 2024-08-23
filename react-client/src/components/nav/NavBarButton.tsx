import { Icon, IconButton } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { navBarHeight, navBarIconSize } from "../../theme";

interface Props {
    name: string
    icon: IconType
}

export default function NavBarButton({ name, icon }: Props) {
    return (
        <IconButton aria-label={name} icon={<Icon as={icon} boxSize={navBarIconSize} />} boxSize={navBarHeight} padding='1rem' borderRadius={0} variant='unstyled' _hover={{ bg: '#141519' }} />
    )
}