import { Flex, Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FooterItem from "./FooterItem";
import { Github } from "lucide-react";

export default observer(function Footer() {
    const { userStore } = useStore()

    return (
        <Flex background='linear-gradient(to bottom, #000, #213944)' justifyContent='center' paddingX={['1rem', '1.5rem', '2rem']} paddingY={['4rem']} marginTop={['4rem']} wrap='wrap' gap='4rem'>
            <Stack>
                <Heading size='md'>Connect With Us</Heading>
                <FooterItem href="https://github.com/zachbray9/MyAnimeVault" isExternal icon={Github}>Github</FooterItem>

            </Stack>

            <Stack>
                <Heading size='md'>Account</Heading>
                {userStore.user ? (
                    <Stack>
                        <FooterItem onClick={userStore.logout}>Logout</FooterItem>
                    </Stack>
                ) : (
                    <Stack>
                        <FooterItem href="/register">Create an account</FooterItem>
                        <FooterItem href="/login">Login</FooterItem>
                    </Stack>
                )}
            </Stack>
        </Flex>
    )
})