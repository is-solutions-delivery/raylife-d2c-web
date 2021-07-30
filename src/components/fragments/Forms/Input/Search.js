import React from "react";
import { ErrorMessage } from "@hookform/error-message";

import { Label } from "../Label";
import { WarningBadge } from "../../Badges/Warning";

export const InputSearch = React.forwardRef(
  (
    {
      name,
      label,
      renderActions,
      children,
      required = false,
      errors,
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
        <div className="content-row">
          <input {...props} ref={ref} name={name} required={required} />
          {children}
        </div>

        <ErrorMessage
          errors={errors}
          name={name}
          render={(data) => <WarningBadge>{data.message}</WarningBadge>}
        />
      </div>
    );
  }
);
