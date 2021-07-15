import styled from "styled-components";
import { getNeutralColor, getPrimaryColor } from "../../styles/utils";

export const TypographyTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 2rem;
  font-weight: bolder;
  color: ${(props) => getNeutralColor(props, "darker")};

  & > .primary {
    padding-left: 0.5rem;
    color: ${(props) => getPrimaryColor(props)};
  }
`;

export const TypographyParagraph = styled.p`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => getNeutralColor(props, "black")};
  opacity: 0.6;
`;
