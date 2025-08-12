import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    children: ReactNode
    to: string
    onClose: () => void
    paddingX?: string
    paddingY?: string
}

export default function SideMenuButton({ children, to, onClose, paddingX = '1rem', paddingY = '0.5rem' }: Props) {
    return (
        <Button asChild onClick={onClose} variant='ghost' justifyContent='start' _focus={{ background: 'inherit', color: 'primary.base', borderLeft: '3px solid', borderColor: 'primary.base' }} paddingX={paddingX} paddingY={paddingY}>
            <NavLink to={to}>{children}</NavLink>
        </Button>
    )
}