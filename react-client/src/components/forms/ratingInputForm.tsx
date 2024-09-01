import { Form, Formik } from "formik";
import { useStore } from "../../stores/store";
import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export default observer(function RatingInputForm() {
    const { listStore } = useStore()
    const toast = useToast()

    return (
        <Formik
            initialValues={{ rating: listStore.userAnimeDetails?.rating }}
            onSubmit={(values) => listStore.updateRating(values.rating!)
                .catch(() => toast({ title: 'Error', description: 'There was a problem updating your rating.', status: 'error', duration: 5000, isClosable: true }))
            }
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>

                </Form>
            )}
        </Formik>
    )
})