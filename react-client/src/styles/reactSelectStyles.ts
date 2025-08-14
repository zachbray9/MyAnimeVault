import { useToken } from "@chakra-ui/react";
import { StylesConfig } from "react-select";
import { ReactSelectOption } from "../models/reactSelectOption";

export function useReactSelectStyles(){
    const [primarybase, surface1, surface2, text] = useToken('colors', ['interactive.primary', 'background.secondary', 'background.card', 'text._dark'])

    const baseStyle: StylesConfig<ReactSelectOption> = {
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
        multiValue: (baseStyles) => ({
            ...baseStyles,
            background: surface2
        }),
        multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: text
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: text
        })
    }

    return baseStyle
}