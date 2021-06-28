import { createGlobalStyle } from "styled-components";
import { getNeutralColor } from "./utils";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  p {
    margin: 0 !important;
  }
}

:root {
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font.family};
  color: ${(props) => getNeutralColor(props)};
}

fieldset {
  border:none;
  outline: none;
}
`;
