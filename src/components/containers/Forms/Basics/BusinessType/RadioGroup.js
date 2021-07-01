import React, { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";

import { Radio } from "../../../../fragments/Forms/Radio";
import { BadgeButton } from "../../../../fragments/Button";
import { LiferayService } from "../../../../../services/liferay";

export const BusinessTypeRadioGroup = ({ businessTypes = [] }) => {
  const { control, setValue } = useFormContext();
  const form = useWatch();

  useEffect(() => {
    if (form?.basics?.businessCategoryId) setBusinessClassCode();
  }, [form?.basics?.businessCategoryId]);

  const setBusinessClassCode = async () => {
    try {
      const categoryId = form.basics.businessCategoryId;

      const businessClassCode = await LiferayService.getBusinessClassCode(
        categoryId
      );

      setValue("basics.businessClassCode", businessClassCode);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <fieldset id="businessType" className="content-column">
      <Controller
        name="basics.businessCategoryId"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          businessTypes.map((businessType) => (
            <Radio
              {...field}
              key={businessType.id}
              value={businessType.id}
              label={businessType.title}
              description={businessType.description}
              selected={businessType.id === form?.basics?.businessCategoryId}
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
