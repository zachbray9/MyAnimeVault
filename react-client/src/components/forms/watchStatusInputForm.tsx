import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FormSelect from "../common/form/FormSelect";
import { WatchStatusOptions } from "../../constants/watchStatusOptions";
import { toaster } from "../ui/toaster";

export default observer(function WatchStatusInputForm() {
    const { listStore } = useStore()

    return (
        <Formik
            initialValues={{ watchStatus: listStore.userAnimeDetails!.watchStatus }}
            onSubmit={(values) => listStore.updateUserAnime(undefined, values.watchStatus)
                .catch(() => toaster.create({ title: 'Error', description: 'There was a problem updating your watch status.', type: 'error', duration: 5000, closable: true }))
            }
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FormSelect name="watchStatus" options={WatchStatusOptions} autoSubmit isSubmtting={isSubmitting} />
                </Form>
            )}
        </Formik>
    )
})