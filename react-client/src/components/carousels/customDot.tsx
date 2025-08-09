import { Box, Button } from "@chakra-ui/react";
import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from "react";

interface Props {
    timeRemaining?: number,
    isHovered: boolean
    isActive: boolean,
    onClick?: () => void
}

interface UseDotButtonType {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export function useDotButton(emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void): UseDotButtonType {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
            if (onButtonClick) onButtonClick(emblaApi)
        },
        [emblaApi, onButtonClick]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)

        emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

export default function CustomDot({ onClick, isActive, timeRemaining, isHovered }: Props) {

    return (
        <Button
            className={isActive ? "active" : "inactive"}
            onClick={onClick}
            borderRadius="full"
            minW={0}
            p={0}
            w={isActive ? 8 : 4}
            h={2}
            mx={1}
            bg="gray"
            pos="relative"
            overflow="hidden"
        >
            {isActive &&
                <Box
                    pos="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w={isHovered ? "100%" : `${timeRemaining! * 100}%`}
                    transition="width 50ms linear"
                    bg="orange"
                    overflow="hidden"
                    h="100%"
                />}

        </Button>
    )
}