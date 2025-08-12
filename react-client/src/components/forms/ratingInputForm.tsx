import { Form, Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import FormSelect from "../common/form/FormSelect";
import { RatingOptions } from "../../constants/ratingOptions";
import { toaster } from "../ui/toaster";

export default observer(function RatingInputForm() {
    const { listStore } = useStore()

    return (
        <Formik
            initialValues={{ rating: listStore.userAnimeDetails!.rating }}
            onSubmit={(values) => listStore.updateUserAnime(values.rating)
                .catch(() => toaster.create({ title: 'Error', description: 'There was a problem updating your rating.', type: 'error', duration: 5000, closable: true }))
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