import React from "react";

import { InputWithMask } from ".";

export const InputWithPhoneMask = React.forwardRef((props, ref) => {
  return (
    <InputWithMask
      {...props}
      ref={ref}
      format="(###) ###-####"
      label="Phone"
      mask="_"
    />
  );
});
