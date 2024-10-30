import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props{
    children: ReactNode
    paddingX?: string
    paddingY?: string
}

export default function SideMenuButton({children, paddingX = '1rem', paddingY = '0.5rem'} : Props){
    return (
        <Button variant='ghost' justifyContent='start' _focus={{background: 'inherit', color: 'primary.base', borderLeft: '3px solid', borderColor: 'primary.base'}} paddingX={paddingX} paddingY={paddingY}>
            {children}
        </Button>
    )
}