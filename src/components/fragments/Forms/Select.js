import React from "react";
import { InputAreaWithError } from "./InputArea/WithError";
import { Label } from "./Label";

export const SelectInput = React.forwardRef(
  (
    { name, label, children, renderActions, error, required = false, ...props },
    ref
  ) => {
    return (
      <InputAreaWithError error={error}>
        {label && (
          <Label name={name} label={label} required={required}>
            {renderActions}
          </Label>
        )}
        <select
          {...props}
          ref={ref}
          name={name}
          className="input"
          required={required}
        >
          {children}
        </select>
      </InputAreaWithError>
    );
  }
);
