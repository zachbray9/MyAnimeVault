import { observer } from "mobx-react-lite"
import { Box, Button, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormInput from "../components/common/form/FormInput"
import { useStore } from "../stores/store"
import * as Yup from "yup"
import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Logo from "../assets/PlotArmorLogo.png"

export default observer(function Login() {
    const { userStore } = useStore()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email field is required.").email("The email you entered is not a valid email.").trim(),
        password: Yup.string().required("Password field is required.").trim()
    })

    return (
        <>
            <Helmet>
                <title>Suit up - Login to PlotArmor</title>
            </Helmet>

            <Stack width='100%' height='85svh' display='flex' justifyContent='center' alignItems='center' padding={['1.5rem', '1.75rem', '4rem']}>
                <Card.Root bg='transparent' border="none" maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                    <Formik
                        initialValues={{ email: '', password: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.login(values).catch(() => setErrors({ error: "Your email or password is incorrect." }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} >
                                <Card.Header as={Stack} alignItems="center" textAlign="center" gap={2}>
                                    <Image src={Logo} boxSize="75px" alt="PlotArmor Logo" />
                                    <Stack gap={1}>
                                        <Heading size="3xl" textAlign="center">Welcome back</Heading>
                                        <Text color="text.subtle">Sign in to suit up and get back to exploring.</Text>
                                    </Stack>
                                </Card.Header>

                                <Card.Body as={Stack} gap={4}>
                                    <FormInput name="email" placeholder="Email" bg="surface.sunken" rounded="lg" _autofill={{ WebkitTextFillColor: "text", boxShadow: "0 0 0px 1000px var(--chakra-colors-surface-sunken) inset !important" }} />

                                    <FormInput name="password" placeholder="Password" bg="surface.sunken" rounded="lg" _autofill={{ WebkitTextFillColor: "text", boxShadow: "0 0 0px 1000px var(--chakra-colors-surface-sunken) inset !important" }} hideable />
                                </Card.Body>

                                <Card.Footer display='flex' flexDirection='column' justifyContent='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                    <Box width='100%' >
                                        {errors.error && <Text color='status.error'>{errors.error}</Text>}
                                    </Box>

                                    <Button type="submit" bg="interactive.primary" color="text" w="100%" rounded="lg" _hover={{ bg: "interactive.primary-hover" }} loading={isSubmitting} >Log In</Button>

                                    <Flex gap={1} color="text.subtle">
                                        <Text>No account?</Text>
                                        <NavLink to="/register">
                                            <Text color='interactive.primary' _hover={{ color: 'interactive.primary-hover' }} transition='color 200ms' cursor="pointer">Create One</Text>
                                        </NavLink>
                                    </Flex>
                                </Card.Footer>
                            </Form>
                        )}
                    </Formik>
                </Card.Root>

            </Stack>
        </>
    )
})