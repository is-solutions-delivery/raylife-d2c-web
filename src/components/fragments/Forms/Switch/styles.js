import styled from "styled-components";

import { BaseButton } from "../../Button";
import { getPrimaryColor } from "../../../../styles/utils";

export const SwitchArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-items: flex-start;
  align-items: center;
`;

export const Switch = styled(BaseButton)`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  background-color: ${(props) =>
    props.selected ? getPrimaryColor(props) : "inherit"};
  color: ${(props) =>
    props.selected ? props.theme.colors.background : getPrimaryColor(props)};
  border: 1px solid ${(props) => getPrimaryColor(props)};
  border-radius: 2rem;

  &:hover {
    background-color: ${(props) => getPrimaryColor(props, "dark")};
    border-color: ${(props) => getPrimaryColor(props, "dark")};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
