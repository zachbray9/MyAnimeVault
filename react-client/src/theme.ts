import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { SelectTheme } from "./styles/ChakraSelectTheme";
import { NumberInputTheme } from "./styles/ChakraNumberInputTheme";
import { ProgressTheme } from "./styles/ChakraProgressBarTheme";
import { InputTheme } from "./styles/ChakraInputTheme";

const navBarHeight = ['3.75rem', null, '3rem']
const navBarIconSize =  ['1.25em', null, '1em']

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
            subtle: '#a0a0a0',
            danger: 'red.600'
        },
        background: {
            _dark: '#000'
        },
        surface: {
            1: '#141519',
            2: '#23252b'
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
                border: '1px solid',
                borderColor: 'primary.base',
                _hover: {
                    borderColor: 'primary.hover'
                },
                transition: 'all 0.3s'
            },
            navbar: {
                boxSize: navBarHeight,
                padding:'1rem',
                borderRadius: 0,
                variant:'unstyled',
                _hover: { 
                    bg: 'surface.1' 
                },
                _active: {
                    bg: 'surface.1'
                }
            }
        }
    },
    Menu: {
        baseStyle: {
            list: {
                bg: 'surface.1',
            },
            item: {
                bg: 'surface.1',
                _hover: {
                    bg: 'surface.2'
                }
            }
        }
    },
    Card: {
        baseStyle: {
            container: {
                bg: 'surface.1'
            }
        }
    },
    Select: SelectTheme,
    NumberInput: NumberInputTheme,
    Progress: ProgressTheme,
    Input: InputTheme
}


const theme = extendTheme({ config, styles, semanticTokens, components })

export default theme
export { navBarIconSize, navBarHeight }