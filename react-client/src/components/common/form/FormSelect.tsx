import Select, { SingleValue } from 'react-select'
import { useField, useFormikContext } from "formik";
import { useToken } from '@chakra-ui/react';
import { ReactSelectOption } from '../../../models/reactSelectOption';

interface Props {
    name: string
    options: ReactSelectOption[]
    autoSubmit?: boolean
    isSubmtting?: boolean
}

export default function FormSelect({ name, options, autoSubmit, isSubmtting }: Props) {
    const [field] = useField(name)
    const { setFieldValue, submitForm } = useFormikContext()
    const [primarybase, surface1, surface2, text] = useToken('colors', ['primary.base', 'surface.1', 'surface.2', 'text._dark'])

    return (
        <Select<ReactSelectOption>
            options={options}
            value={options.find(option => option.value === field.value)}
            isDisabled={isSubmtting}
            isLoading={isSubmtting}
            onChange={(selectedOption: SingleValue<ReactSelectOption>) => {
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
                    transition: 'all 0.3s',
                    '&:hover': {
                        borderColor: state.isFocused ? primarybase : surface2,
                        boxShadow: state.isFocused ? primarybase : surface2
                    }
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    background: surface1,
                    transition: 'all 0.3s',
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