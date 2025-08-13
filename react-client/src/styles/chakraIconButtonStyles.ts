import { defineRecipe } from "@chakra-ui/react";

export const iconButtonRecipe = defineRecipe({
    variants: {
        variant: {
            outline: {
                _hover: {
                    bg: "whiteAlpha.400"
                }
            }
        }
    }
})