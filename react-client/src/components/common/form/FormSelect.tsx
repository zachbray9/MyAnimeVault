import { Select } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";

interface Props {
    name: string
    options: Map<number | string, string>
    autoSubmit?: boolean
}

export default function FormSelect({ name, options, autoSubmit }: Props) {
    const [field] = useField(name)
    const { setFieldValue, submitForm } = useFormikContext()

    return (
        <Select
            {...field}
            id={name}
            onChange={(e) => {
                const isKeyNumber = Array.from(options.keys()).every(key => typeof key === 'number');
                const value = isKeyNumber ? Number(e.target.value) : e.target.value;

                setFieldValue(name, value)
                if(autoSubmit){
                    submitForm()
                }
            }}
        >
            {Array.from(options.entries()).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
        </Select>
    )
}