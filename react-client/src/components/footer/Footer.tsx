import { Flex, Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FaGithub } from "react-icons/fa6";
import { useStore } from "../../stores/store";
import FooterItem from "./FooterItem";

export default observer(function Footer() {
    const { userStore } = useStore()

    return (
        <Flex background='linear-gradient(to bottom, #000, #213944)' justifyContent='center' paddingX={['1rem', '1.5rem', '2rem']} paddingY={['4rem']} marginTop={['4rem']} wrap='wrap' gap='4rem'>
            <Stack>
                <Heading size='sm'>Connect With Us</Heading>
                <FooterItem href="https://github.com/zachbray9/MyAnimeVault" isExternal icon={FaGithub}>Github</FooterItem>

            </Stack>

            <Stack>
                <Heading size='sm'>Account</Heading>
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