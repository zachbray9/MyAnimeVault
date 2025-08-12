import { Form, Formik } from "formik";
import FormNumberInput from "../common/form/formNumberInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Flex, Text } from "@chakra-ui/react";
import * as Yup from 'yup'
import { toaster } from "../ui/toaster";

export default observer(function NumEpisodesWatchedInputForm() {
    const { listStore, animeStore } = useStore()
    const { userAnimeDetails } = listStore
    const { selectedAnime } = animeStore

    const validationSchema = Yup.object({
        numEpisodesWatched: Yup.number().min(0, 'Episodes watched cannot be less than 0.').max(selectedAnime?.episodes || Infinity, 'Episodes watched cannot exceed the total number of episodes.').required("Value cannot be empty.").integer("Value cannot be a decimal.")
    })

    return (
        <Formik
            initialValues={{ numEpisodesWatched: userAnimeDetails!.numEpisodesWatched }}
            onSubmit={(values) => listStore.updateUserAnime(undefined, undefined, values.numEpisodesWatched)
                .catch(() => toaster.create({ title: 'Error', description: 'There was a problem updating your episodes watched.', type: 'error', duration: 5000, closable: true }))
            }
            validationSchema={validationSchema}
        >
            {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Flex align='center' gap='1rem'>
                        <Text>Episodes:</Text>
                        <FormNumberInput name="numEpisodesWatched" min={0} max={selectedAnime?.episodes || Infinity} isSubmtting={isSubmitting} autoSubmit />
                        <Text>/</Text>
                        <Text>{selectedAnime?.episodes || '?'}</Text>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
})