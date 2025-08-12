import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from "react";

interface ArrowButtonProps {
    onClick: () => void,
    disabled?: boolean
}

interface UsePrevNextButtonsType {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

export function usePrevNextButtons(emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void): UsePrevNextButtonsType {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        if (onButtonClick) onButtonClick(emblaApi)
    }, [emblaApi, onButtonClick])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        if (onButtonClick) onButtonClick(emblaApi)
    }, [emblaApi, onButtonClick])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}


export function CustomPrevCarouselArrow({ onClick, disabled }: ArrowButtonProps) {
    //needs to be the same as the padding of the top level stack in the AnimeCarousel component, but negative
    const responsivePadding = useBreakpointValue({
        base: '-1.25rem',
        md: '-4rem'
    })

    return (
        <IconButton
            aria-label="carousel-prev"
            visibility={disabled ? "hidden" : "visible"}
            position="absolute"
            left={responsivePadding}
            top="0"
            bottom="0"
            h="100%"
            bg="transparent"
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
        </IconButton>
    )
}

export function CustomNextCarouselArrow({ onClick, disabled }: ArrowButtonProps) {
    //needs to be the same as the padding of the top level stack in the AnimeCarousel component, but negative
    const responsivePadding = useBreakpointValue({
        base: '-1.25rem',
        md: '-4rem'
    })

    return (
        <IconButton
            aria-label="carousel-next"
            visibility={disabled ? "hidden" : "visible"}
            position="absolute"
            right={responsivePadding}
            h="100%"
            bg="transparent"
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
        </IconButton>
    )
}

export function CustomFeaturedPrevArrow({ onClick }: ArrowButtonProps) {
    return (
        <IconButton
            aria-label="featured-prev"
            variant='ghost'
            rounded="full"
            fontSize={['1.5rem', '2rem', '2.5rem']}
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
        >
            <ChevronLeftIcon />
        </IconButton>
    )
}

export function CustomFeaturedNextArrow({ onClick }: ArrowButtonProps) {
    return (
        <IconButton
            aria-label="featured-next"
            variant='ghost'
            rounded="full"
            fontSize={['1.5rem', '2rem', '2.5rem']}
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
        >
            <ChevronRightIcon />
        </IconButton>
    )
}