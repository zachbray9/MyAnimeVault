import { progressAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(progressAnatomy.keys);

const baseStyle = definePartsStyle({
    filledTrack: {
        bg: "primary.base"
    }
});

export const ProgressTheme = defineMultiStyleConfig({ baseStyle });