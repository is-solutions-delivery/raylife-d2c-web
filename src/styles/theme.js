export const Theme = {
  colors: {
    primary: {
      light: "var(--gray-300, #e1ebff)",
      default: "var(--primary, #4c85ff)",
      dark: "var(--btn-link-color, #295ccc)",
    },
    secondary: {
      default: "var(--secondary, #f69d37)",
      dark: "var(--btn-secondary-color, #f4870b)",
    },
    neutral: {
      black: "var(--black, #09101d)",
      darker: "var(--dark, #2f313d)", // Neutral 1
      dark: "var(--gray-600, #606167)", // Neutral 2 e 3
      default: "var(--gray-500, #7d7e85)",
      light: "var(--gray-400, #98999b)", // Neutral 4
    },
    background: "var(--body-bg, #ffffff)",
    foreground: "var(--light, #f9f9f9)",
  },
  font: {
    family: "var(--font-family-sans-serif, '\"Barlow\", sans-serif')",
  },
};
