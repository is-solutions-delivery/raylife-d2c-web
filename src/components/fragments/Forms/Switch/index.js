import React from "react";

import { InputArea, InputLabel } from "../Input/styles";
import { HiddenInput, Switch as SwitchStyled, SwitchArea } from "./styles";

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
        <SwitchArea>
          <SwitchStyled
            type="button"
            onClick={() => onChange("true")}
            selected={value === "true"}
          >
            Yes
          </SwitchStyled>
          <SwitchStyled
            type="button"
            onClick={() => onChange("false")}
            selected={value === "false"}
          >
            No
          </SwitchStyled>
        </SwitchArea>
        <HiddenInput
          {...props}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
        />
      </InputArea>
    );
  }
);
