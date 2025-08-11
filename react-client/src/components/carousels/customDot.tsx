import { Box, Button, keyframes } from "@chakra-ui/react";
import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from "react";

interface Props {
    delay: number
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

const progressKeyframes = keyframes`
    0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

export default function CustomDot({ onClick, isActive, delay, isHovered }: Props) {

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
            bg={ isActive && isHovered ? "primary.base" : "gray"}
            _hover={{ bg: "primary.base"}}
            pos="relative"
            overflow="hidden"
        >
            {isActive &&
                <Box
                    pos="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w="100%"
                    animation={`${progressKeyframes} ${delay + 100}ms linear forwards`} //added a millisecond of grace because setInterval lags behind animation
                    sx={{
                        animationPlayState: isHovered ? "paused" : "running",
                        willChange: "transform",
                        transformStyle: "preserve-3d"
                    }}
                    bg="primary.base"
                    overflow="hidden"
                    h="100%"
                />
            }

        </Button>
    )
}