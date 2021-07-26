/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";

import { Radio } from "../../../../fragments/Forms/Radio";
import { LiferayService } from "../../../../../services/liferay";
import { useLiferayState } from "../../../../../hooks/useLiferayState";
import { businessTypeAtom } from "../../../../../atoms";

export const BusinessTypeRadioGroup = ({ businessTypes = [] }) => {
  const form = useWatch();
  const { control, setValue } = useFormContext();
  // eslint-disable-next-line no-unused-vars
  const [businessTypeState, setBusinessTypeState] =
    useLiferayState(businessTypeAtom);

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
              renderActions={
                <button
                  type="button"
                  className="btn badge"
                  onClick={() =>
                    setBusinessTypeState({ data: businessType.id })
                  }
                >
                  More Info
                </button>
              }
            />
          ))
        }
      />
      <button
        type="button"
        className="btn badge"
        style={{ width: "fit-content" }}
      >
        None of these describe my business
      </button>
    </fieldset>
  );
};
