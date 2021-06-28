import ReactInputMask from "react-number-format";
import styled, { css } from "styled-components";

import { getNeutralColor } from "../../../../styles/utils";

export const InputLabel = styled.label`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => getNeutralColor(props, "black")};
  font-weight: bold;
  font-size: 1.125rem;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
`;

const BaseInputStyle = css`
  display: flex;
  padding: 0 1rem;
  height: 3rem;
  width: auto;

  font-weight: 500;
  font-size: 1rem;
  color: ${(props) => getNeutralColor(props, "black")};

  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${(props) => getNeutralColor(props)};
  border-radius: 0.25rem;
  transition: all ease-out 200ms;

  &:focus,
  &:hover {
    background: ${({ theme }) => theme.colors.foreground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &::placeholder {
    opacity: 0.4;
  }
`;

export const Input = styled.input`
  ${BaseInputStyle}
`;

export const InputWithMask = styled(ReactInputMask)`
  ${BaseInputStyle}
`;

export const Select = styled.select`
  ${BaseInputStyle}
`;
