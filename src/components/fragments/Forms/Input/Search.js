import React from "react";

import { Label } from "../Label";
import { WarningBadge } from "../../Badges/Warning";

export const InputSearch = React.forwardRef(
  (
    { name, label, renderActions, children, required = false, error, ...props },
    ref
  ) => {
    return (
      <div className={`input-area ${!!error && "invalid"}`}>
        {label && (
          <Label name={name} label={label} required={required}>
            {renderActions}
          </Label>
        )}
        <div className="content-row">
          <input {...props} ref={ref} name={name} required={required} />
          {children}
        </div>
        {error && <WarningBadge>{error.message}</WarningBadge>}
      </div>
    );
  }
);
