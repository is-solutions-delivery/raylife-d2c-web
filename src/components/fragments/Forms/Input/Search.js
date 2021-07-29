import React from "react";
import { Label } from "../Label";

export const InputSearch = React.forwardRef(
  (
    { name, label, renderActions, children, required = false, ...props },
    ref
  ) => {
    return (
      <div className="input-area">
        {label && (
          <Label name={name} label={label} required={required}>
            {renderActions}
          </Label>
        )}
        <div className="content-row">
          <input {...props} ref={ref} name={name} required={required} />
          {children}
        </div>
      </div>
    );
  }
);
