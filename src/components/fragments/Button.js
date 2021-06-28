import styled from "styled-components";
import {
  getNeutralColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../styles/utils";

export const BaseButton = styled.button.attrs((props) => ({
  type: "button",
  ...props,
}))`
  display: flex;
  border: none;
  cursor: pointer;
  outline: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 1rem;
  transition: 200ms all ease-out;
  text-transform: uppercase;
  height: 3.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimarySolidButton = styled(BaseButton)`
  background: ${(props) => getPrimaryColor(props)};
  color: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${(props) => getPrimaryColor(props, "dark")};
  }
`;

export const SecondarySolidButton = styled(BaseButton)`
  background: ${(props) => getSecondaryColor(props)};
  color: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${(props) => getSecondaryColor(props, "dark")};
  }
`;

export const FlatButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.background};
  color: ${(props) => getNeutralColor(props)};
`;

export const OutlineButton = styled(FlatButton)`
  border: 1px solid ${(props) => getNeutralColor(props)};
`;

export const BadgeButton = styled(BaseButton)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 1.5rem;
  gap: 0.5rem;

  font-size: 0.75rem;
  text-transform: capitalize;

  background-color: ${(props) => getPrimaryColor(props, "light")};
  color: ${(props) => getPrimaryColor(props)};
`;
