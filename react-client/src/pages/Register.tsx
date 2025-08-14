import { Box, Button, Card, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
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
                <title>Unlock your armor - Sign up for PlotArmor</title>
            </Helmet>

            <Box width='100%' height='85svh' display='flex' justifyContent='center' alignItems='center' padding={['1.5rem', '1.75rem', '4rem']} position='relative'>
                <Card.Root bg="background.secondary" maxWidth='31rem' width='100%' padding={['1.25rem', '1.75rem', '2rem']}>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.register(values).catch(() => setErrors({ error: 'There was a problem creating your account.' }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} >
                                <Card.Header>
                                    <Heading size="3xl" textAlign="center">Create Account</Heading>
                                </Card.Header>

                                <Card.Body as={Stack} gap={['1.5rem', '1.75rem', '2rem']}>
                                    <FormInput name="email" placeholder="Email" variant='flushed' />

                                    <FormInput name="password" placeholder="Password" variant='flushed' hideable />

                                    <FormInput name="confirmPassword" placeholder="Confirm Password" variant='flushed' hideable />
                                </Card.Body>

                                <Card.Footer display='flex' flexDirection='column' justifyContent='start' alignItems='center' gap={['1.25rem', '1.75', '2rem']}>
                                    <Box width='100%' >
                                        {errors.error && <Text color='text.danger'>{errors.error}</Text>}
                                    </Box>

                                    <Button type="submit" bg="interactive.primary" _hover={{bg: "primary.hover"}} loading={isSubmitting} >Create Account</Button>


                                    <Flex gap={1}>
                                        <Text>Already have an account?</Text>
                                        <NavLink to="/login">
                                            <Link color='interactive.primary' _hover={{ color: 'text._dark' }} transition='all 0.3s'>Log In</Link>
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