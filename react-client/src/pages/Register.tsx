import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import FormInput from "../components/common/form/FormInput";
import { useStore } from "../stores/store";
import * as Yup from "yup"
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default observer(function Register() {
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required.").email("Must enter a valid email.").max(255, "Email cannot exceed 320 characters.").trim(),
        password: Yup.string().required("Password is required.").min(6, "Password must be at least 6 characters.").trim(),
        confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password")], "Passwords do not match.")
    })

    return (
        <>
            <Helmet>
                <title>Register for MyAnimeVault: Explore Anime Anytime!</title>
            </Helmet>

            <Box width='100%' height='85svh' display='flex' justifyContent='center' alignItems='center' padding={['1.5rem', '1.75rem', '4rem']} position='relative'>
                <Card maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.register(values).catch(() => setErrors({ error: 'There was a problem creating your account.' }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} >
                                <CardHeader display='flex' justifyContent='center'>
                                    <Heading>Create Account</Heading>
                                </CardHeader>

                                <CardBody as={Stack} gap={['1.5rem', '1.75rem', '2rem']}>
                                    <FormInput name="email" placeholder="Email" variant='flushed' />

                                    <FormInput name="password" placeholder="Password" variant='flushed' hideable />

                                    <FormInput name="confirmPassword" placeholder="Confirm Password" variant='flushed' hideable />
                                </CardBody>

                                <CardFooter display='flex' flexDirection='column' justify='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                    <Box width='100%' >
                                        {errors.error && <Text color='text.danger'>{errors.error}</Text>}
                                    </Box>

                                    <Button type="submit" variant='solid' isLoading={isSubmitting} >Create Account</Button>

                                    <Text>Already have an account? <Text as={NavLink} to='/login' variant='link' color='primary.base' _hover={{ color: 'text._dark' }} transition='all 0.3s'>Log In</Text></Text>
                                </CardFooter>
                            </Form>
                        )}
                    </Formik>
                </Card>

            </Box>
        </>
    )
})