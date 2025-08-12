import { InputGroup, NumberInput, Spinner } from "@chakra-ui/react";
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

    const debouncedSubmitRef = useRef(debounce(() => submitForm(), 800));

    useEffect(() => {
        const debouncedSubmit = debouncedSubmitRef.current

        return () => {
            debouncedSubmit.cancel()
        }
    }, [])

    const handleChange = (valueAsNumber: number) => {
        if(valueAsNumber !== field.value){
            setFieldValue(name, valueAsNumber)
    
            if (autoSubmit) {
                debouncedSubmitRef.current()
            }
        }
    }

    return (
        <InputGroup width='fit-content' endAddon={isSubmtting && <Spinner />}>
            <NumberInput.Root
                {...field}
                id={name}
                min={min}
                max={max}
                onValueChange={value => handleChange(value.valueAsNumber)}
                disabled={isSubmtting}
            >
                <NumberInput.Control />
                <NumberInput.Input />
            </NumberInput.Root>
        </InputGroup>
    )
}