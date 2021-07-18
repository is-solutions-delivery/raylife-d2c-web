import React from "react";

import { InputArea, InputLabel } from "./Input/styles";

export const Switch = React.forwardRef(
  (
    {
      name,
      label,
      renderActions,
      value = "true",
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    return (
      <InputArea>
        {label && (
          <InputLabel htmlFor={name}>
            {label}
            {renderActions}
          </InputLabel>
        )}
        <div className="switch-wrapper">
          <button
            className={`btn switch ${value === "true" && "selected"}`}
            type="button"
            onClick={() => onChange("true")}
          >
            Yes
          </button>
          <button
            className={`btn switch ${value === "false" && "selected"}`}
            type="button"
            onClick={() => onChange("false")}
          >
            No
          </button>
        </div>
        <input
          {...props}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          className="hidden"
        />
      </InputArea>
    );
  }
);
