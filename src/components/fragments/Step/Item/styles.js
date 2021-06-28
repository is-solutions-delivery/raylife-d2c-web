import styled from "styled-components";
import { getNeutralColor, getPrimaryColor } from "../../../../styles/utils";

export const StepItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 1rem;
  font-size: 1.15rem;
  font-weight: bold;
  color: ${(props) => getNeutralColor(props, "light")};

  & > i {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;

    ::before {
      content: "";
      display: block;
      margin: auto;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.6rem;
      background-color: ${(props) => getNeutralColor(props, "light")};
    }
  }

  &.selected {
    overflow: show;
    color: ${(props) => getPrimaryColor(props)};

    > i {
      ::before {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 1rem;
        background-color: ${(props) => getPrimaryColor(props)};
      }
    }

    .progress-ring {
      position: absolute;
      z-index: 1;
      opacity: 0.7;
    }
  }
`;
