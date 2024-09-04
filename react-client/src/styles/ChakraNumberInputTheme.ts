import { numberInputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys)

const filled = definePartsStyle({
    field: {
        background: 'surface.1',
        border: '1px solid',
        _hover: {
            background: 'surface.1',
            borderColor: 'surface.2',
        },
        _focus: {
            background: 'surface.1',
            borderColor: 'primary.base',
            _hover: {
                borderColor: 'primary.base',
            boxShadow: 'primary.base'
            }
        }
    }
})

export const NumberInputTheme = defineMultiStyleConfig({ variants: {filled} })