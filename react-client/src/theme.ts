import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const navBarHeight = ['3.75rem', null, '3.75rem']
const navBarIconSize = ['1.25em', null, '1em']

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                gray: {
                    50: { value: "#f8fafc" },
                    100: { value: "#f1f5f9" },
                    200: { value: "#e2e8f0" },
                    300: { value: "#cbd5e1" },
                    400: { value: "#94a3b8" },
                    500: { value: "#64748b" },
                    600: { value: "#475569" },
                    700: { value: "#334155" },
                    800: { value: "#1e293b" },
                    900: { value: "#0f172a" },
                    950: { value: "#020617" }
                },
                primary: {
                    50: { value: "#eff6ff" },
                    100: { value: "#dbeafe" },
                    200: { value: "#bfdbfe" },
                    300: { value: "#93c5fd" },
                    400: { value: "#60a5fa" },
                    500: { value: "#3b82f6" },
                    600: { value: "#2563eb" },
                    700: { value: "#1d4ed8" },
                    800: { value: "#1e40af" },
                    900: { value: "#1e3a8a" },
                    950: { value: "#172554" }
                },
                surface: {
                    50: { value: "#f0f0f0" },
                    100: { value: "#e6e6e6" },
                    200: { value: "#cccccc" },
                    300: { value: "#b3b3b3" },
                    400: { value: "#999999" },
                    500: { value: "#6b7280" },
                    600: { value: "#525252" },
                    700: { value: "#404040" },
                    800: { value: "#262626" },
                    900: { value: "#1a1a1a" },
                    950: { value: "#0a0a0a" }
                }
            },
            // surface: {
            //     1: { value: '#141519' },
            //     2: { value: '#23252b' }
            // },
            // primary: {
            //     base: { value: '#ff640a' },
            //     hover: { value: '#ff8c2b' }
            // }
        },


        semanticTokens: {
            colors: {
                text: {
                    DEFAULT: { value: { base: "colors.gray.50", _dark: "colors.gray.50" } },
                    secondary: { value: { base: "colors.gray.300", _dark: "colors.gray.300" } },
                    tertiary: { value: { base: "colors.gray.500", _dark: "colors.gray.500" } },
                    inverse: { value: { base: "colors.surface.900", _dark: "colors.surface.900" } },
                    accent: { value: { base: "colors.primary.500", _dark: "colors.primary.500" } },
                    subtle: { value: { base: "colors.gray.400", _dark: "colors.gray.400" } },
                    // danger: {
                    //     value: { base: "red.600", _dark: "red.600" }
                    // }
                },
                background: {
                    DEFAULT: { value: { base: "colors.surface.900", _dark: "colors.surface.900" } },
                    secondary: { value: { base: "colors.surface.800", _dark: "colors.surface.800" } },
                    tertiary: { value: { base: "colors.gray.800", _dark: "colors.gray.800" } },
                    overlay: { value: { base: "black/80", _dark: "black/80" } },                                //transparent value isn't working (will figure out later)
                    card: { value: { base: "colors.surface.800", _dark: "colors.surface.800" } },
                    hover: { value: { base: "colors.surface.700", _dark: "colors.surface.700" } },
                },
                interactive: {
                    primary: { value: { base: "colors.primary.500", _dark: "colors.primary.500" } },
                    "primary-hover": { value: { base: "colors.primary.600", _dark: "colors.primary.600" } },
                    secondary: { value: { base: "colors.gray.600", _dark: "colors.gray.600" } },
                    "secondary-hover": { value: { base: "colors.gray.500", _dark: "colors.gray.500" } },
                    tertiary: { value: { base: "transparent", _dark: "transparent" } },
                    "tertiary-hover": { value: { base: "colors.gray.800", _dark: "colors.gray.800" } }
                },
                surface: {
                    raised: { value: { base: "colors.surface.700", _dark: "colors.surface.700" } },
                    sunken: { value: { base: "colors.surface.950", _dark: "colors.surface.950" } },
                    metallic: { value: { base: "linear-gradient(135deg, {gray.600}, {gray.700})", _dark: "linear-gradient(135deg, {gray.600}, {gray.700})" } },       //gradient doesn't work
                    armor: { value: { base: "linear-gradient(145deg, colors.surface.700, colors.surface.800)", _dark: "linear-gradient(145deg, colors.surface.700, colors.surface.800)" } },       //gradient doesn't work
                },
                status: {
                    success: { value: { base: "#10b981", _dark: "#10b981" } },
                    warning: { value: { base: "#f59e0b", _dark: "#f59e0b" } },
                    error: { value: { base: "#ef4444", _dark: "#ef4444" } },
                    info: { value: { base: "colors.primary.500", _dark: "colors.primary.500" } },
                },
                border: {
                    DEFAULT: {value: { base: "colors.gray.700", _dark: "colors.gray.700"}},
                    subtle: {value: { base: "colors.gray.800", _dark: "colors.gray.800"}},
                    accent: {value: { base: "colors.primary.500", _dark: "colors.primary.500"}},
                    hover: {value: { base: "colors.gray.600", _dark: "colors.gray.600"}},
                }
            }
        },
    },
    globalCss: {
        "html, body": {
            bg: "background",
            color: "text"
        },
    },
})

export const system = createSystem(defaultConfig, config)
export { navBarIconSize, navBarHeight }