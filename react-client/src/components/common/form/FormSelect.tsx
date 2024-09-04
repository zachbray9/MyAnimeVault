import Select, { SingleValue } from 'react-select'
import { useField, useFormikContext } from "formik";
import { useToken } from '@chakra-ui/react';

interface Option{
    value: string | number,
    label: string
}

interface Props {
    name: string
    options: Option[]
    autoSubmit?: boolean
    isSubmtting: boolean
}

export default function FormSelect({ name, options, autoSubmit, isSubmtting }: Props) {
    const [field] = useField(name)
    const { setFieldValue, submitForm } = useFormikContext()
    const [primarybase, surface1, surface2, text] = useToken('colors', ['primary.base', 'surface.1', 'surface.2', 'text._dark'])

    const selectedOption = options.find(option => option.value === field.value)

    return (
        <Select
            value={selectedOption}
            options={options}
            isDisabled={isSubmtting}
            isLoading={isSubmtting}
            onChange={(selectedOption: SingleValue<Option>) => {
                setFieldValue(name, selectedOption?.value)

                if (autoSubmit) {
                    submitForm()
                }
            }}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    background: surface1,
                    borderColor: state.isFocused ? primarybase : surface1,
                    boxShadow: state.isFocused ? primarybase : surface1,
                    '&:hover': {
                        borderColor: state.isFocused ? primarybase : surface2,
                        boxShadow: state.isFocused ? primarybase : surface2
                    }
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    background: surface1,
                    '&:hover': {
                        background: surface2
                    }
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    background: surface1
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: text
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: text
                })
            }}
        />

    )
}