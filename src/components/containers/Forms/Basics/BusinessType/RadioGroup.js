import React from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";

import { Radio } from "../../../../fragments/Forms/Radio";
import { BadgeButton } from "../../../../fragments/Button";

export const BusinessTypeRadioGroup = ({ businessTypes = [] }) => {
  const { control } = useFormContext();
  const form = useWatch();

  return (
    <fieldset id="businessType" className="content-column">
      <Controller
        name="basics.businessType"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          businessTypes.map((businessType) => (
            <Radio
              {...field}
              key={businessType.id}
              label={businessType.title}
              description={businessType.description}
              value={businessType.id}
              selected={businessType.id === form?.basics?.businessType}
              renderActions={<BadgeButton>More Info</BadgeButton>}
            />
          ))
        }
      />
      <BadgeButton style={{ width: "fit-content" }}>
        None of these describe my business
      </BadgeButton>
    </fieldset>
  );
};
