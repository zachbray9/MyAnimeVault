import { Stack, Text } from "@chakra-ui/react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function AnimeDetails(){
    const {animeStore} = useStore()
    const {animeId} = useParams()

    useEffect(() => {
        if(animeId){
            animeStore.loadAnimeDetails(parseInt(animeId, 10))
        }

        return () => {
            animeStore.clearSelectedAnime()
        }
    }, [animeId, animeStore])

    return (
        <Stack>
            {animeStore.selectedAnime && <Text>{animeStore.selectedAnime?.title.english}</Text>}
        </Stack>
    )
})