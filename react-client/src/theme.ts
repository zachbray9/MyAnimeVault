import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const styles = {
    global: () => ({
        body: {
            bg: 'background',
            color: 'text'
        }
    })
}

const semanticTokens = {
    colors: {
        text: {
            _dark: '#f5f5f5'
        },
        background: {
            _dark: '#000'
        }
    }
}

const theme = extendTheme({config, styles, semanticTokens})

export default theme