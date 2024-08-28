import { observer } from "mobx-react-lite"
import { Box, Heading, Image, Input, InputGroup, Stack } from "@chakra-ui/react"
import RamenCat from '../assets/LoginFormCat.png'

export default observer( function Login(){

    return (
        <Box width='100%' display='flex' justifyContent='center' padding={['1.5rem', '1.75rem', '4rem']}>
            <Stack maxWidth='31rem' width='100%' align='center' gap={['1.5rem', '1.75rem', '2rem']}>
                <Heading>Log In</Heading>
                <Stack pos='relative' alignItems='center' justifyContent='center' width='100%' bg='surface.2' padding={['1.5rem', '1.75rem', '2rem']} gap={['1.5rem', '1.75rem', '2rem']} >
                    <Image src={RamenCat} position='absolute' top='-95' right='-5' boxSize='6.625rem'/>
                    <InputGroup>
                        <Input variant='flushed' placeholder="Email" _focusVisible={{borderColor: 'primary.base'}}/>
                    </InputGroup>
                    <InputGroup>
                        <Input variant='flushed' placeholder="Password" _focusVisible={{borderColor: 'primary.base'}}/>
                    </InputGroup>
                </Stack>
            </Stack>
        </Box>
    )
})