import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { iconButtonRecipe } from "./styles/chakraIconButtonStyles";
// import { SelectTheme } from "./styles/ChakraSelectTheme";
// import { NumberInputTheme } from "./styles/ChakraNumberInputTheme";
// import { ProgressTheme } from "./styles/ChakraProgressBarTheme";
// import { InputTheme } from "./styles/ChakraInputTheme";

const navBarHeight = ['3.75rem', null, '3rem']
const navBarIconSize = ['1.25em', null, '1em']

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                surface: {
                    1: {value: '#141519'},
                    2: {value: '#23252b'}
                },
                primary: {
                    base: {value: '#ff640a'},
                    hover: {value: '#ff8c2b'}
                }
            },

        },
        semanticTokens: {
            colors: {
                text: {
                    value: { base: "#000", _dark: "#f5f5f5"},
                    subtle: {
                        value: { base: "#a0a0a0", _dark: "#a0a0a0"}
                    },
                    danger: {
                        value: { base: "red.600", _dark: "red.600"}
                    }
                },
                background: {
                    value: { base: "#fff", _dark: "#000"}
                }
            }
        },
        recipes: {
            button: iconButtonRecipe
        }
    },
    globalCss: {
        "html, body": {
            bg: "background",
            color: "text"
        },
    },
})

// const components = {
//     Button: {
//         baseStyle: {
//             borderRadius: 'none'
//         },
//         variants: {
//             solid: {
//                 bg: 'primary.base',
//                 color: '#000',
//                 _hover: {
//                     bg: 'primary.hover'
//                 },
//                 transition: 'all 0.3s'
//             },
//             outline: {
//                 bg: 'transparent',
//                 color: 'primary.base',
//                 border: '1px solid',
//                 borderColor: 'primary.base',
//                 _hover: {
//                     borderColor: 'primary.hover'
//                 },
//                 transition: 'all 0.3s'
//             },
//             navbar: {
//                 boxSize: navBarHeight,
//                 padding: '1rem',
//                 borderRadius: 0,
//                 variant: 'unstyled',
//                 _hover: {
//                     bg: 'surface.1'
//                 },
//                 _active: {
//                     bg: 'surface.1'
//                 }
//             }
//         }
//     },
//     Menu: {
//         baseStyle: {
//             list: {
//                 bg: 'surface.1',
//             },
//             item: {
//                 bg: 'surface.1',
//                 _hover: {
//                     bg: 'surface.2'
//                 }
//             }
//         }
//     },
//     Card: {
//         baseStyle: {
//             container: {
//                 bg: 'surface.1'
//             }
//         }
//     },
//     Toast: {
//         baseStyle: {
//             container: {
//                 zindex: 9999
//             }
//         }
//     },
//     Select: SelectTheme,
//     NumberInput: NumberInputTheme,
//     Progress: ProgressTheme,
//     Input: InputTheme
// }

// const theme = createSystem(defaultConfig, { components })

export const system = createSystem(defaultConfig, config)
export { navBarIconSize, navBarHeight }