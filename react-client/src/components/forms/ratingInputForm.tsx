import { Form, Formik } from "formik";
import { useStore } from "../../stores/store";
import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import FormSelect from "../common/form/FormSelect";
import { RatingOptions } from "../../constants/ratingOptions";

export default observer(function RatingInputForm() {
    const { listStore } = useStore()
    const toast = useToast()

    return (
        <Formik
            initialValues={{ rating: listStore.userAnimeDetails!.rating }}
            onSubmit={(values) => listStore.updateUserAnime(values.rating)
                .catch(() => toast({ title: 'Error', description: 'There was a problem updating your rating.', status: 'error', duration: 5000, isClosable: true, position: 'top' }))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FormSelect name="rating" options={RatingOptions} autoSubmit isSubmtting={isSubmitting} />
                </Form>
            )}
        </Formik>
    )
})