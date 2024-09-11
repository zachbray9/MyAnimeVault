import { observer } from "mobx-react-lite"
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormInput from "../components/common/form/FormInput"
import { useStore } from "../stores/store"
import * as Yup from "yup"

export default observer(function Login() {
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email field is required.").email("The email you entered is not a valid email.").trim(),
        password: Yup.string().required("Password field is required.").trim()
    })

    return (
        <Box width='100%' display='flex' justifyContent='center' padding={['1.5rem', '1.75rem', '4rem']}>
            <Card maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                <Formik
                    initialValues={{ email: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.login(values).catch(() => setErrors({ error: 'Username or password is incorrect.' }))}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isSubmitting, dirty, errors }) => (
                        <Form onSubmit={handleSubmit} >
                            <CardHeader display='flex' justifyContent='center'>
                                <Heading>Log In</Heading>
                            </CardHeader>

                            <CardBody as={Stack} gap={['1.5rem', '1.75rem', '2rem']}>
                                <FormInput name="email" placeholder="Email" variant='flushed' />

                                <FormInput name="password" placeholder="Password" variant='flushed' hideable />
                            </CardBody>

                            <CardFooter display='flex' flexDirection='column' justify='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                <Box width='100%' >
                                    {errors.error && <Text color='text.danger'>{errors.error}</Text>}
                                </Box>
                                <Button type="submit" variant='solid' disabled={!dirty} isLoading={isSubmitting} >Log In</Button>
                            </CardFooter>
                        </Form>
                    )}
                </Formik>
            </Card>

        </Box>
    )
})