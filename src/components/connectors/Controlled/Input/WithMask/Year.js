import React from "react";

import { ControlledInputWithMask } from ".";

export const YearControlledInput = ({ inputProps = {}, ...props }) => {
  return (
    <ControlledInputWithMask
      {...props}
      inputProps={{ format: "####", mask: "_", ...inputProps }}
    />
  );
};
