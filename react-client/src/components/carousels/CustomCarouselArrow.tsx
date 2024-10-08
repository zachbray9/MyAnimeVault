import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { ArrowProps } from "react-multi-carousel";


export function CustomLeftCarouselArrow({ onClick }: ArrowProps) {
    //needs to be the same as the padding of the top level stack in the AnimeCarousel component, but negative
    const responsivePadding = useBreakpointValue({
        base: '-1.25rem',
        md: '-4rem'
    })

    return (
        <Box
            position="absolute"
            left={responsivePadding}
            top="0"
            bottom="0"
            display="flex"
            paddingX='0.5rem'
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            cursor="pointer"
            onClick={onClick}
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgGradient: 'linear(to-l, transparent, rgba(0, 0, 0, 0.80))',
                transition: 'opacity 0.3s',
                opacity: 0,
                zIndex: -1
            }}
            _hover={{
                _before: {
                    opacity: 1
                }
            }}
        >
            <ChevronLeftIcon boxSize='2.5rem' color="white" />
        </Box>
    )
}

export function CustomRightCarouselArrow({ onClick }: ArrowProps) {
    //needs to be the same as the padding of the top level stack in the AnimeCarousel component, but negative
    const responsivePadding = useBreakpointValue({
        base: '-1.25rem',
        md: '-4rem'
    })

    return (
        <Box
            position="absolute"
            right={responsivePadding}
            top="0"
            bottom="0"
            display="flex"
            paddingX='0.5rem'
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            cursor="pointer"
            onClick={onClick}
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgGradient: 'linear(to-r, transparent, rgba(0, 0, 0, 0.80))',
                transition: 'opacity 0.3s',
                opacity: 0,
                zIndex: -1
            }}
            _hover={{
                _before: {
                    opacity: 1
                }
            }}
        >
            <ChevronRightIcon boxSize='2.5rem' color="white" />
        </Box>
    )
}

export function CustomFeaturedLeftArrow({ onClick }: ArrowProps) {
    return (
        <IconButton
            aria-label="left-arrow"
            variant='ghost'
            isRound
            fontSize={['1.5rem', '2rem', '2.5rem']}
            icon={<ChevronLeftIcon/>}
            position="absolute"
            left="5"
            top="50%"
            transform="translateY(-50%)"
            onClick={onClick}
            zIndex={1}
            _hover={{
                bg: 'blackAlpha.400'
            }}
            _active={{
                bg: 'blackAlpha.600'
            }}
        />
    )
}

export function CustomFeaturedRightArrow({ onClick }: ArrowProps) {
    return (
        <IconButton
            aria-label="right-arrow"
            variant='ghost'
            isRound
            fontSize={['1.5rem', '2rem', '2.5rem']}
            icon={<ChevronRightIcon />}
            position="absolute"
            right="5"
            top="50%"
            transform="translateY(-50%)"
            onClick={onClick}
            zIndex={1}
            _hover={{
                bg: 'blackAlpha.400'
            }}
            _active={{
                bg: 'blackAlpha.600'
            }}
        />
    )
}