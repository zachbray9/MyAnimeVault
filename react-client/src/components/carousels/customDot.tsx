import { Box, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from "react";

interface Props {
    delay: number
    isHovered: boolean
    isActive: boolean,
    index: number,
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

const progressKeyframes = keyframes`
    0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

export default function CustomDot({ onClick, isActive, delay, isHovered, index }: Props) {

    return (
        <Button
            className={isActive ? "active" : "inactive"}
            onClick={onClick}
            borderRadius="full"
            minW={0}
            p={0}
            w={isActive ? 8 : 4}
            h={1.5}
            mx={1}
            bg={isActive && isHovered ? "interactive.primary" : "gray.600"}
            _hover={{ bg: "interactive.primary" }}
            pos="relative"
            overflow="hidden"
            transition="width 200ms ease-out, background 200ms ease-out"
            willChange="width"
            border="none"
        >
            {isActive &&
                <Box
                    key={index}
                    pos="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w="100%"
                    animation={`${progressKeyframes} ${delay + 100}ms linear forwards`} //added a millisecond of grace because setInterval lags behind animation
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                        willChange: "transform",
                        transformStyle: "preserve-3d"
                    }}
                    bg="interactive.primary"
                    overflow="hidden"
                    h="100%"
                />
            }

        </Button>
    )
}