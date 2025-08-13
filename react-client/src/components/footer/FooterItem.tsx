import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface Props {
    children: ReactNode
    href?: string
    isExternal?: boolean
    icon?: LucideIcon
    onClick?: () => void
}

export default function FooterItem({ children, href, isExternal, icon, onClick }: Props) {
    const sharedStyles = {
        color: 'text.subtle',
        _hover: {
            color: 'text',
            textDecoration: 'underline',
            cursor: 'pointer'
        },
        transition: "color 200ms ease-out"
    }

    const content = (
        <Flex gap='0.5rem' alignItems='center'>
            {icon && <Icon as={icon} size="md"/>}
            <Text>{children}</Text>
        </Flex>
    )

    if (href) {
        return isExternal ? (
            <Link href={href} target="_blank" {...sharedStyles}>
                {content}
            </Link>
        ) : (
            <Link asChild {...sharedStyles}>
                <NavLink to={href}>{content}</NavLink>
            </Link>
        )
    }

    return (
        <Box {...sharedStyles} onClick={onClick}>
            {content}
        </Box>
    )
}