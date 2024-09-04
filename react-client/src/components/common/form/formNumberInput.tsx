import { InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";

interface Props {
    name: string
    min?: number
    max?: number
    autoSubmit?: boolean
    isSubmtting: boolean
}

export default function FormNumberInput({ name, min, max, autoSubmit, isSubmtting }: Props) {
    const [field] = useField(name)
    const { setFieldValue, submitForm } = useFormikContext()

    const debouncedSubmitRef = useRef(debounce(() => submitForm(), 500));

    useEffect(() => {
        const debouncedSubmit = debouncedSubmitRef.current

        return () => {
            debouncedSubmit.cancel()
        }
    }, [])

    const handleChange = (_: string, valueAsNumber: number) => {
        if(valueAsNumber !== field.value){
            setFieldValue(name, valueAsNumber)
    
            if (autoSubmit) {
                debouncedSubmitRef.current()
            }
        }
    }

    return (
        <InputGroup width='fit-content'>
            <NumberInput
                {...field}
                variant='filled'
                id={name}
                min={min}
                max={max}
                clampValueOnBlur
                keepWithinRange
                onChange={handleChange}
                isDisabled={isSubmtting}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            {isSubmtting &&
                <InputRightElement>
                    <Spinner />
                </InputRightElement>
            }
        </InputGroup>
    )
}