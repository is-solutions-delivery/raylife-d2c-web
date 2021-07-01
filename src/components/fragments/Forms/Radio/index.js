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
      value,
      selected = false,
      ...props
    },
    ref
  ) => {
    return (
      <RadioAreaStyled
        className={selected && "selected"}
        onClick={() =>
          props.onChange({
            target: {
              value,
            },
          })
        }
      >
        <RadioInput
          {...props}
          ref={ref}
          type="radio"
          name={name}
          checked={selected}
          value={value}
        />
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
