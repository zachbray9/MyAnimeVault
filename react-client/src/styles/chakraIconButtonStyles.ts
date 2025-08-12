import { defineRecipe } from "@chakra-ui/react";

export const iconButtonRecipe = defineRecipe({
    variants: {
        visual: {
            navbar: {
                h: "100%",
                aspectRatio: "1:1",
                bg: "red"
            }
        }
    }
})