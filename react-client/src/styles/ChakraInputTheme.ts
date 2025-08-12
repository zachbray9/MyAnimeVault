// import { inputAnatomy } from '@chakra-ui/anatomy'
// import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

// const { definePartsStyle, defineMultiStyleConfig } =
//     createMultiStyleConfigHelpers(inputAnatomy.keys)

// const flushed = definePartsStyle({
//     field: {
//         border: '0px 0px 0px 1px solid',
//         _focus: {
//             borderColor: 'primary.base',
//             boxShadow: 'none',
//             _hover: {
//                 borderColor: 'primary.base',
//                 boxShadow: 'none'
//             }
//         },
//         '&:-webkit-autofill': {
//             backgroundColor: 'transparent', // Ensure it doesn't change to a different color
//             boxShadow: '0 0 0px 1000px transparent inset',
//             WebkitTextFillColor: 'inherit', // Keep text color same as the rest of the inputs
//             transition: 'background-color 5000s ease-in-out 0s', // Prevent browser's autofill transition effect
//         },
//     }
// })

// const outline = definePartsStyle({
//     field: {
//         border: '1px solid',
//         borderRadius: '6px',
//         _focus: {
//             borderColor: 'primary.base',
//             boxShadow: 'none',
//             _hover: {
//                 borderColor: 'primary.base',
//                 boxShadow: 'none'
//             }
//         },
//         '&:-webkit-autofill': {
//             backgroundColor: 'transparent', // Ensure it doesn't change to a different color
//             boxShadow: '0 0 0px 1000px transparent inset',
//             WebkitTextFillColor: 'inherit', // Keep text color same as the rest of the inputs
//             transition: 'background-color 5000s ease-in-out 0s', // Prevent browser's autofill transition effect
//         },
//     }
// })

// export const InputTheme = defineMultiStyleConfig({ variants: { flushed, outline } })