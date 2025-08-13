import { observer } from "mobx-react-lite"
import { Box, Button, Card, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormInput from "../components/common/form/FormInput"
import { useStore } from "../stores/store"
import * as Yup from "yup"
import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default observer(function Login() {
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email field is required.").email("The email you entered is not a valid email.").trim(),
        password: Yup.string().required("Password field is required.").trim()
    })

    return (
        <>
            <Helmet>
                <title>MyAnimeVault Login: Keep Track of Your Favorite Shows With Your Account</title>
            </Helmet>

            <Box width='100%' height='85svh' display='flex' justifyContent='center' alignItems='center' padding={['1.5rem', '1.75rem', '4rem']}>
                <Card.Root bg="surface.1" maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                    <Formik
                        initialValues={{ email: '', password: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.login(values).catch(() => setErrors({ error: "Your email or password is incorrect." }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} >
                                <Card.Header>
                                    <Heading size="3xl" textAlign="center">Log In</Heading>
                                </Card.Header>

                                <Card.Body as={Stack} gap={['1.5rem', '1.75rem', '2rem']}>
                                    <FormInput name="email" placeholder="Email" variant='flushed' />

                                    <FormInput name="password" placeholder="Password" variant='flushed' hideable />
                                </Card.Body>

                                <Card.Footer display='flex' flexDirection='column' justifyContent='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                    <Box width='100%' >
                                        {errors.error && <Text color='text.danger'>{errors.error}</Text>}
                                    </Box>

                                    <Button type="submit" bg="primary.base" loading={isSubmitting} >Log In</Button>

                                    <Flex gap={1}>
                                        <Text>No account?</Text>
                                        <NavLink to="/register">
                                            <Link color='primary.base' _hover={{ color: 'text', borderColor: "text"}} transition='color 200ms'>Create One</Link>
                                        </NavLink>
                                    </Flex>
                                </Card.Footer>
                            </Form>
                        )}
                    </Formik>
                </Card.Root>

            </Box>
        </>
    )
})