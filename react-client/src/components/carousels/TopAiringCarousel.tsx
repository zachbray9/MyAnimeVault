import Carousel from "react-multi-carousel";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Card, CardHeader, Heading } from "@chakra-ui/react";

export default observer(function TopAiringCarousel() {
    const { animeStore } = useStore()

    useEffect(() => {
        animeStore.loadTopAiringShows()
    }, [animeStore])

    return (
        <Carousel responsive={{}}>
            {animeStore.topAiringShows.map((anime) => (
                <Card>
                    <CardHeader>
                        <Heading>{anime.title}</Heading>
                    </CardHeader>
                </Card>
            ))}
        </Carousel>
    )
})