import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { BusinessInformationAddress } from "./Address";
import { Input } from "../../../../fragments/Forms/Input";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { InputWithMask } from "../../../../fragments/Forms/Input/WithMask";
import { LiferayService } from "../../../../../services/liferay";
import { CardFormActionsWithSave } from "../../../../fragments/Card/FormActionsWithSave";

const setFormPath = (value) => `basics.businessInformation.${value}`;

export const FormBasicBusinessInformation = () => {
  const form = useWatch();
  const { setSection } = useStepWizard();
  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext();

  const onSave = async () => {
    try {
      await LiferayService.createBasicsApplication(form.basics);
    } catch (error) {
      console.error(error);
    }
  };

  const goToPreviousForm = () =>
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_TYPE);

  const goToNextForm = () => {
    onSave();
    setSection(AVAILABLE_STEPS.BASICS_PRODUCT_QUOTE);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content-row">
          <Input
            {...register(setFormPath("firstName"), {
              required: true,
            })}
            label="First Name"
            required
          />
          <Input
            {...register(setFormPath("lastName"), {
              required: true,
            })}
            label="Last Name"
            required
          />
        </div>
        <Input
          {...register(setFormPath("business.email"), {
            required: true,
          })}
          label="Business Email"
          type="email"
          required
        />
        <Controller
          name={setFormPath("business.phone")}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <InputWithMask
              {...field}
              label="Phone"
              format="(###) ###-####"
              mask="_"
              required
            />
          )}
        />
        <Input
          {...register(setFormPath("business.website"))}
          label="Business Website (optional)"
        />
        <BusinessInformationAddress />
      </div>
      <CardFormActionsWithSave
        onPrevious={goToPreviousForm}
        onNext={goToNextForm}
        onSave={onSave}
        isValid={isValid}
      />
    </div>
  );
};
