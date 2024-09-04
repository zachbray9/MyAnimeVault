import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FormSelect from "../common/form/FormSelect";
import { useToast } from "@chakra-ui/react";

export default observer(function WatchStatusInputForm() {
    const { listStore } = useStore()
    const toast = useToast()

    const watchStatusOptions = [
        {value: 'Watching', label: 'Watching'},
        {value: 'Completed', label: 'Completed'},
        {value: 'On hold', label: 'On hold'},
        {value: 'Dropped', label: 'Dropped'},
        {value: 'Plan to watch', label: 'Plan to watch'},
    ]

    return (
        <Formik
            initialValues={{ watchStatus: listStore.userAnimeDetails!.watchStatus}}
            onSubmit={(values) => listStore.updateUserAnime(undefined, values.watchStatus)
                .catch(() => toast({title: 'Error', description: 'There was a problem updating your watch status.', status: 'error', duration: 5000, isClosable: true, position: 'top'}))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FormSelect name="watchStatus" options={watchStatusOptions} autoSubmit isSubmtting={isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
})