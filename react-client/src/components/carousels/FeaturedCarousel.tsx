import { Heading, Skeleton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function FeaturedCarousel() {
    const {animeStore} = useStore()

    useEffect(() => {
        animeStore.loadFeaturedShows()
    }, [animeStore])

    return (
        <>
            <Heading>Featured Carousel</Heading>
            {animeStore.isLoadingFeaturedShows ? (
                <Skeleton width='100%' height='2rem'/>
            ) : (
                <Text>{animeStore.featuredShows[0]?.title.english}</Text>
            )}        
        </>
    )

})