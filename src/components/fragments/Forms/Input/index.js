import React from "react";

import { Input as InputStyled, InputArea, InputLabel } from "./styles";

export const Input = React.forwardRef(
  ({ name, label, renderActions, ...props }, ref) => {
    return (
      <InputArea>
        {label && (
          <InputLabel htmlFor={name}>
            {label}
            {renderActions}
          </InputLabel>
        )}
        <InputStyled {...props} ref={ref} name={name} />
      </InputArea>
    );
  }
);
