import React from "react";
import ReactInputMask from "react-number-format";
import { Label } from "../Label";

export const InputWithMask = React.forwardRef(
  (
    {
      name,
      label,
      renderActions,
      allowNegative = false,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-area">
        {label && (
          <Label name={name} label={label} required={required}>
            {renderActions}
          </Label>
        )}
        <ReactInputMask
          {...props}
          allowNegative={allowNegative}
          ref={ref}
          name={name}
          className="input"
          required={required}
        />
      </div>
    );
  }
);
