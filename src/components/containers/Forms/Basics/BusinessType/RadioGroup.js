import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Radio } from "../../../../fragments/Forms/Radio";
import { BadgeButton } from "../../../../fragments/Button";

export const BusinessTypeRadioGroup = ({ businessTypes = [] }) => {
  const { register } = useFormContext();
  const form = useWatch();

  return (
    <fieldset id="businessType" className="content-column">
      {businessTypes.map((businessType) => (
        <Radio
          key={businessType.id}
          name="businessType"
          label={businessType.title}
          description={businessType.description}
          value={businessType.id}
          selected={businessType.id === form?.basics?.businessType}
          {...register("basics.businessType", { required: true, value: "" })}
        />
      ))}
      <BadgeButton style={{ width: "fit-content" }}>
        None of these describe my business
      </BadgeButton>
    </fieldset>
  );
};
