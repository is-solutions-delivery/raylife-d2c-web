import { rgba } from "polished";
import styled from "styled-components";
import { getNeutralColor, getPrimaryColor } from "../../styles/utils";

export const TypographyTitle = styled.h2`
  font-family: Barlow;
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
  color: ${(props) => rgba(getNeutralColor(props, "black"), 0.6)};
`;
