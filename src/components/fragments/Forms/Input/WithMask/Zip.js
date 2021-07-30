import React from "react";
import { InputWithMask } from ".";

export const InputWithZipMask = React.forwardRef((props, ref) => {
  return (
    <InputWithMask {...props} ref={ref} format="#####" label="ZIP" mask="_" />
  );
});