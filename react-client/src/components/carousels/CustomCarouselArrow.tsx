import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { ArrowProps } from "react-multi-carousel";

interface Props extends ArrowProps{
    paddingToSubtract: number
}

export function CustomLeftCarouselArrow({ paddingToSubtract, onClick }: Props) {
    return (
        <Box
            position="absolute"
            left={`-${paddingToSubtract}px`}
            top="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            width="40px"
            background="rgba(0, 0, 0, 0.08)"
            _hover={{ background: "rgba(0, 0, 0, 0.24)" }}
            transition='0.2s all'
            cursor="pointer"
            onClick={onClick}
        >
            <ChevronLeftIcon boxSize={6} color="white"/>
        </Box>
    )
}

export function CustomRightCarouselArrow({ paddingToSubtract, onClick }: Props) {
    return (
        <Box
            position="absolute"
            right={`-${paddingToSubtract}px`}
            top="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            width="40px"
            background="rgba(0, 0, 0, 0.08)"
            _hover={{ background: "rgba(0, 0, 0, 0.24)" }}
            transition='0.2s all'
            cursor="pointer"
            onClick={onClick}
        >
            <ChevronRightIcon boxSize={6} color="white" />
        </Box>
    )
}