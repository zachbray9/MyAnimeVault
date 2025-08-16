import { Box, Button, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import FormInput from "../components/common/form/FormInput";
import { useStore } from "../stores/store";
import * as Yup from "yup"
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Logo from "../assets/PlotArmorLogo.png"

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
                <title>Unlock your armor - Sign up for PlotArmor</title>
            </Helmet>

            <Box width='100%' height='85svh' display='flex' justifyContent='center' alignItems='center' padding={['1.5rem', '1.75rem', '4rem']} position='relative'>
                <Card.Root bg="transparent" border="none" maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.register(values).catch(() => setErrors({ error: 'There was a problem creating your account.' }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} >
                                <Card.Header as={Stack} alignItems="center" textAlign="center" gap={2}>
                                    <Image src={Logo} alt="PlotArmor Logo" boxSize="75px" />

                                    <Stack gap={1}>
                                        <Heading size="3xl" textAlign="center">Gear Up, Hero</Heading>
                                        <Text color="text.subtle">Sign up to never lose track of your anime journey again.</Text>
                                    </Stack>
                                </Card.Header>

                                <Card.Body as={Stack} gap={4}>
                                    <FormInput name="email" placeholder="Email" bg="surface.sunken" rounded="lg" _autofill={{ WebkitTextFillColor: "text", boxShadow: "0 0 0px 1000px var(--chakra-colors-surface-sunken) inset !important" }} />

                                    <FormInput name="password" placeholder="Password" bg="surface.sunken" rounded="lg" _autofill={{ WebkitTextFillColor: "text", boxShadow: "0 0 0px 1000px var(--chakra-colors-surface-sunken) inset !important" }} hideable />

                                    <FormInput name="confirmPassword" placeholder="Confirm Password" bg="surface.sunken" rounded="lg" _autofill={{ WebkitTextFillColor: "text", boxShadow: "0 0 0px 1000px var(--chakra-colors-surface-sunken) inset !important" }} hideable />
                                </Card.Body>

                                <Card.Footer display='flex' flexDirection='column' justifyContent='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                    <Box width='100%' >
                                        {errors.error && <Text color='status.error'>{errors.error}</Text>}
                                    </Box>

                                    <Button type="submit" bg="interactive.primary" color="text" w="100%" _hover={{ bg: "interactive.primary-hover" }} loading={isSubmitting} >Create Account</Button>


                                    <Flex gap={1}>
                                        <Text>Already have an account?</Text>
                                        <NavLink to="/login">
                                            <Text color='interactive.primary' _hover={{ color: 'interactive.primary-hover' }} transition='all 0.3s'>Log In</Text>
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