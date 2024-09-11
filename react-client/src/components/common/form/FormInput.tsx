import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

interface Props extends InputProps {
    name: string
    hideable?: boolean
}

export default function FormInput({ name, hideable, ...props }: Props) {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const [show, setShow] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setFieldValue(name, input)
    }

    const toggleVisibility = () => {
        setShow(!show)
    }

    return (
        <FormControl isInvalid={meta.touched && !!meta.error}>
            <InputGroup>
                <Input
                    {...props}
                    value={field.value}
                    onChange={handleInputChange}
                    type={hideable ? (show ? 'text' : 'password') : 'text'}
                />

                {hideable &&
                    <InputRightElement>
                        <Button onClick={toggleVisibility} variant='ghost' color='text.subtle' _hover={{bg: 'none', color: 'text._dark'}}>{show ? 'hide' : 'show'}</Button>
                    </InputRightElement>
                }
            </InputGroup>

            {meta.touched && meta.error && (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
        </FormControl>
    )
}