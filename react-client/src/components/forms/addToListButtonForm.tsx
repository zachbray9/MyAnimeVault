import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { FaPlus } from "react-icons/fa6";
import { AniListAnime } from "../../models/aniListAnime";

interface Props {
    animeToAdd: AniListAnime
}

export default observer(function AddToListButtonForm({ animeToAdd }: Props) {
    const { userStore } = useStore()
    const toast = useToast()

    return (
        <Formik
            initialValues={{ anime: animeToAdd }}
            onSubmit={(values) => userStore.addAnimeToList(values.anime!)
                .catch(() => toast({ title: 'Error', description: "There was a problem adding this anime to your list.", status: 'error', duration: 5000, isClosable: true }))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Button type="submit" variant='solid' isLoading={isSubmitting} width='fit-content' rightIcon={<FaPlus />}>Add to list</Button>
                </Form>
            )}
        </Formik>
    )
})