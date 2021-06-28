import React from "react";
import { ProgressRing } from "../../ProgressRing";
import { StepItemStyled } from "./styles";

export const StepItem = ({ selected = false, percentage = 0, children }) => {
  return (
    <StepItemStyled className={selected && "selected"}>
      <i>
        {selected && (
          <ProgressRing
            className="progress-ring"
            diameter={32}
            percent={percentage}
            strokeWidth={3}
          />
        )}
      </i>
      {children}
    </StepItemStyled>
  );
};
