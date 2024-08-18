import { Stack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>MyAnimeVault - Home</title>
            </Helmet>

            <Stack>
                Hello world!
            </Stack>
        </>
    )
}