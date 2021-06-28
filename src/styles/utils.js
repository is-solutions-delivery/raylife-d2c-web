/**
 * @param {import("styled-components").ThemeProps} props - Styled components  theme props
 * @param {"default" | "light" | "dark"} variant - Theme variant
 * @returns {string} Hex of theme color variant
 */
export const getPrimaryColor = (props, variant = "default") =>
  props.theme.colors.primary[variant];

/**
 * @param {import("styled-components").ThemeProps} props - Styled components  theme props
 * @param {"default" | "dark"} variant - Theme variant
 * @returns {string} Hex of theme color variant
 */
export const getSecondaryColor = (props, variant = "default") =>
  props.theme.colors.secondary[variant];

/**
 * @param {import("styled-components").ThemeProps} props - Styled components  theme props
 * @param {"default" | "black" | "darker" | "dark" | "light"} variant - Theme variant
 * @returns {string}  Hex of theme color variant
 */
export const getNeutralColor = (props, variant = "default") =>
  props.theme.colors.neutral[variant];
