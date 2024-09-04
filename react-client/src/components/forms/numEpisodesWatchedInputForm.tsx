import { Form, Formik } from "formik";
import FormNumberInput from "../common/form/formNumberInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Flex, Text, useToast } from "@chakra-ui/react";
import * as Yup from 'yup'

export default observer(function NumEpisodesWatchedInputForm() {
    const { listStore, animeStore } = useStore()
    const {userAnimeDetails} = listStore
    const {selectedAnime} = animeStore
    const toast = useToast()

    const validationSchema = Yup.object({
        numEpisodesWatched: Yup.number().min(0, 'Episodes watched cannot be less than 0.').max(selectedAnime?.episodes || Infinity, 'Episodes watched cannot exceed the total number of episodes.').required()
    })

    return (
        <Formik
            initialValues={{ numEpisodesWatched: userAnimeDetails!.numEpisodesWatched}}
            onSubmit={(values) => listStore.updateUserAnime(undefined, undefined, values.numEpisodesWatched)
                .catch(() => toast({title: 'Error', description: 'There was a problem updating your episodes watched.', status: 'error', duration: 5000, isClosable: true, position: 'top'}))
            }
            validationSchema={validationSchema}
        >
            {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Flex align='center' gap='1rem'>
                        <FormNumberInput name="numEpisodesWatched" min={0} max={selectedAnime!.episodes || Infinity} isSubmtting={isSubmitting} autoSubmit/>
                        <Text>/</Text>
                        <Text>{selectedAnime?.episodes ? selectedAnime.episodes : '?'}</Text>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
})