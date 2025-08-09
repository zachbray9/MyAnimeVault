import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAutoPlay(emblaApi: EmblaCarouselType | undefined, delay: number) {
    const [isRunning, setIsRunning] = useState(true)
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const startTimeRef = useRef<number>(0)
    const intervalIdRef = useRef<number | undefined>(undefined)
    const delayDivisionCacheRef = useRef(1 / delay)

    const onStart = () => {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
    }

    const onPause = () => {
        setIsRunning(false)
        clearInterval(intervalIdRef.current)
    }

    const onReset = useCallback(() => {
        setElapsedTime(0)
        startTimeRef.current = Date.now()
    }, [])

    const onTimeElapsed = useCallback(() => {
        if (emblaApi) {
            emblaApi?.scrollNext()
        }
        onReset()
        return
    }, [emblaApi, onReset])

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 50)
        }

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning])

    useEffect(() => {
        if (elapsedTime >= delay) {
            onTimeElapsed()
        }
    }, [delay, elapsedTime, onTimeElapsed])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on("select", onReset)

        return () => {
            emblaApi.off("select", onReset)
        }
    }, [emblaApi, onReset])


    return { isRunning, progress: Math.min(elapsedTime * delayDivisionCacheRef.current, 1), onStart, onPause, onReset }
}