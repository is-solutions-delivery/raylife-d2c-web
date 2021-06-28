import React from "react";

import { RadioAreaStyled, RadioInput } from "./styles";

export const Radio = React.forwardRef(
  (
    {
      name,
      label,
      sideLabel,
      renderActions,
      description,
      selected = false,
      ...props
    },
    ref
  ) => {
    return (
      <RadioAreaStyled className={selected && "selected"}>
        <RadioInput ref={ref} name={name} type="radio" {...props} />
        <div className="content">
          <div className="content-header">
            <label htmlFor={name}>
              {label}
              <small>{sideLabel}</small>
            </label>
            {renderActions}
          </div>
          <p>{description}</p>
        </div>
      </RadioAreaStyled>
    );
  }
);
