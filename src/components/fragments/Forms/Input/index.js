import React from "react";
import { Label } from "../Label";

export const Input = React.forwardRef(
  ({ name, label, renderActions, required = false, ...props }, ref) => {
    console.log(props);

    return (
      <div className="input-area">
        {label && (
          <Label name={name} label={label} required={required}>
            {renderActions}
          </Label>
        )}
        <input {...props} ref={ref} name={name} required={required} />
      </div>
    );
  }
);
