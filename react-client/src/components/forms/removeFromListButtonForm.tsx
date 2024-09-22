import { Button, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useStore } from "../../stores/store"
import { FaTrash } from "react-icons/fa6"
import { observer } from "mobx-react-lite"

interface Props {
    animeId: number
}

export default observer(function RemoveFromListButtonForm({animeId}: Props) {
    const { userStore } = useStore()
    const toast = useToast()

    return (
        <Formik
            initialValues={{ }}
            onSubmit={() => userStore.removeAnimeFromList(animeId)
                .catch(() => toast({ title: 'Error', description: "There was a problem removing this anime from your list.", status: 'error', duration: 5000, isClosable: true }))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Button type="submit" variant='outline' isLoading={isSubmitting} width='fit-content' rightIcon={<FaTrash />}>Remove from list</Button>
                </Form>
            )}
        </Formik>
    )
})