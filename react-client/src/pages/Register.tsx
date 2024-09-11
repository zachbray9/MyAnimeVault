import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import FormInput from "../components/common/form/FormInput";
import { useStore } from "../stores/store";
import * as Yup from "yup"

export default observer(function Register(){
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required.").email("Must enter a valid email.").max(255, "Email cannot exceed 320 characters.").trim(),
        password: Yup.string().required("Password is required.").min(6, "Password must be at least 6 characters.").trim(),
        confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password")], "Passwords do not match.")
    })

    return (
        <Box width='100%' display='flex' justifyContent='center' padding={['1.5rem', '1.75rem', '4rem']}>
            <Card maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.register(values).catch(() => setErrors({ error: 'There was a problem creating your account.' }))}
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

                                <FormInput name="confirmPassword" placeholder="Confirm Password" variant='flushed' hideable/>
                            </CardBody>

                            <CardFooter display='flex' flexDirection='column' justify='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                <Box width='100%' >
                                    {errors.error && <Text color='text.danger'>{errors.error}</Text>}
                                </Box>
                                <Button type="submit" variant='solid' disabled={!dirty} isLoading={isSubmitting} >Create Account</Button>
                            </CardFooter>
                        </Form>
                    )}
                </Formik>
            </Card>

        </Box>
    )
})