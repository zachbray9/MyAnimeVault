import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const styles = {
    global: () => ({
        body: {
            bg: 'background',
            color: 'text',
        }
    })
}

const semanticTokens = {
    colors: {
        text: {
            _dark: '#f5f5f5',
            subtle: '#a0a0a0'
        },
        background: {
            _dark: '#000'
        },
        primary: {
            base: '#ff640a',
            hover: '#ff8c2b'
        }
    }

}

const components = {
    Button: {
        baseStyle: {
            borderRadius: 'none'
        },
        variants: {
            solid: {
                bg: 'primary.base',
                color: '#000',
                _hover: {
                    bg: 'primary.hover'
                },
                transition: 'all 0.3s'
            },
            outline: {
                bg: 'transparent',
                color: 'primary.base',
                border: '2px solid primary.base',
                
            }
        }
    },
    IconButton: {
        baseStyle: {
            borderRadius: 'none'
        },
        variants: {
            solid: {
                bg: 'primary.base',
                color: '#000',
                _hover: {
                    bg: 'primary.hover'
                },
                transition: 'all 0.3s'
            },
            outline: {
                bg: 'transparent',
                color: 'primary.base',
                border: '2px solid',
                borderColor: 'primary.base',
                _hover: {
                    borderColor: 'primary.hover'
                },
                transition: 'all 0.3s'
            }
        }
    }
}


const theme = extendTheme({ config, styles, semanticTokens, components })

export default theme