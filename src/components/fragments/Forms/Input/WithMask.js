import React from "react";

import {
  InputWithMask as InputWithMaskStyled,
  InputArea,
  InputLabel,
} from "./styles";

export const InputWithMask = React.forwardRef(
  ({ name, label, renderActions, allowNegative = false, ...props }, ref) => {
    return (
      <InputArea>
        {label && (
          <InputLabel htmlFor={name}>
            {label}
            {renderActions}
          </InputLabel>
        )}
        <InputWithMaskStyled
          {...props}
          allowNegative={allowNegative}
          ref={ref}
          name={name}
        />
      </InputArea>
    );
  }
);
