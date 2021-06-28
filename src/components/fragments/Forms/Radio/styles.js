import { rgba } from "polished";
import styled from "styled-components";

import { getNeutralColor, getPrimaryColor } from "../../../../styles/utils";

export const RadioAreaStyled = styled.div`
  display: flex;
  padding: 1rem;
  gap: 0.75rem;
  border: 1px solid ${(props) => rgba(getNeutralColor(props), 0.25)};
  border-radius: 0.5rem;

  & > .content {
    display: flex;
    flex: 1 1;
    flex-direction: column;

    > .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        font-size: 1.15rem;
        font-weight: bold;
        color: ${(props) => getNeutralColor(props, "darker")};

        small {
          margin-left: 0.5rem;
          font-weight: 500;
        }
      }
    }

    p {
      font-size: 0.8rem;
      font-weight: 500;
      color: ${(props) => getNeutralColor(props, "dark")};
    }
  }

  &.selected {
    border: 1px solid ${(props) => getPrimaryColor(props)};
    background: ${(props) => rgba(getPrimaryColor(props, "dark"), 0.1)};

    button {
      background-color: ${(props) => getPrimaryColor(props, "dark")};
      color: ${({ theme }) => theme.colors.background};
    }

    label {
      color: ${(props) => getPrimaryColor(props)};
    }
  }
`;

export const RadioInput = styled.input`
  margin: 0.3rem auto;
  outline: none;
  border: none;
  appearance: none;

  ::after {
    position: relative;
    display: block;
    cursor: pointer;
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    border: 1px solid #4c85ff;
    transition: all 200ms ease-out;
  }

  &:checked {
    ::after {
      width: 1rem;
      height: 1rem;
      border-width: 4px;
      transition: all 200ms ease-out;
    }
  }
`;
