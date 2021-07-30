import React from "react";

import { InputWithMask } from ".";

export const InputWithPercentageMask = React.forwardRef((props, ref) => {
  return (
    <InputWithMask {...props} ref={ref} suffix="%" mask="_" decimalScale={2} />
  );
});
