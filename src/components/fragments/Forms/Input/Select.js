import React from "react";
import { Label } from "../Label";

export const SelectInput = React.forwardRef(
  (
    { name, label, children, renderActions, required = false, ...props },
    ref
  ) => {
    return (
      <div className="input-area">
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
      </div>
    );
  }
);