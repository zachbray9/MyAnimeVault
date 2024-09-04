import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys)

const outline = definePartsStyle({
    field: {
        _focusVisible: {
            ringColor: 'primary.base',
            ringOffsetColor: 'primary.base',
            borderColor: 'primary.base',
            boxShadow: '0 0 0 1px (--chakra-colors-chakra-primary-base)'
        },
    },
    icon: {

    }
})

export const SelectTheme = defineMultiStyleConfig({
    variants: { outline }
})