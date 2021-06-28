import React from "react";

import { InputArea, InputLabel, Select } from "./styles";

export const SelectInput = React.forwardRef(
  ({ name, label, children, renderActions, ...props }, ref) => {
    return (
      <InputArea>
        {label && (
          <InputLabel htmlFor={name}>
            {label}
            {renderActions}
          </InputLabel>
        )}
        <Select {...props} ref={ref} name={name}>
          {children}
        </Select>
      </InputArea>
    );
  }
);
