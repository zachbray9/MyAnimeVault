import { Flex, Spinner, Text } from "@chakra-ui/react";

interface Props {
    text: string
}

export default function LoadingComponent({ text }: Props) {
    return (
        <Flex gap={4} height='100svh' width='100%' justify='center' align='center'>
            <Spinner size='lg' color='interactive.primary'/>
            <Text >{text}</Text>
        </Flex>
    )
}