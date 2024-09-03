import { Form, Formik } from "formik";
import { useStore } from "../../stores/store";
import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import FormSelect from "../common/form/FormSelect";

export default observer(function RatingInputForm() {
    const { listStore } = useStore()
    const toast = useToast()

    const ratingOptions: Map<number, string> = new Map([
        [1, '(1) Appalling'],
        [2, '(2) Horrible'],
        [3, '(3) Very bad'],
        [4, '(4) Bad'],
        [5, '(5) Average'],
        [6, '(6) Fine'],
        [7, '(7) Good'],
        [8, '(8) Very good'],
        [9, '(9) Great'],
        [10, '(10) Masterpiece'],
    ])

    return (
        <Formik
            initialValues={{ rating: listStore.userAnimeDetails!.rating }}
            onSubmit={(values) => listStore.updateUserAnime(values.rating)
                .catch(() => toast({ title: 'Error', description: 'There was a problem updating your rating.', status: 'error', duration: 5000, isClosable: true, position: 'top' }))
            }
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <FormSelect name="rating" options={ratingOptions} autoSubmit={true} />
                </Form>
            )}
        </Formik>
    )
})