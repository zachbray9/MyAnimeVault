import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FormSelect from "../common/form/FormSelect";
import { useToast } from "@chakra-ui/react";
import { WatchStatusOptions } from "../../constants/watchStatusOptions";

export default observer(function WatchStatusInputForm() {
    const { listStore } = useStore()
    const toast = useToast()

    return (
        <Formik
            initialValues={{ watchStatus: listStore.userAnimeDetails!.watchStatus}}
            onSubmit={(values) => listStore.updateUserAnime(undefined, values.watchStatus)
                .catch(() => toast({title: 'Error', description: 'There was a problem updating your watch status.', status: 'error', duration: 5000, isClosable: true, position: 'top'}))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FormSelect name="watchStatus" options={WatchStatusOptions} autoSubmit isSubmtting={isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
})