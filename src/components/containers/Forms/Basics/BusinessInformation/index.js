import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { BusinessInformationAddress } from "./Address";
import { Input } from "../../../../fragments/Forms/Input";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { LiferayService } from "../../../../../services/liferay";
import { CardFormActionsWithSave } from "../../../../fragments/Card/FormActionsWithSave";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  WEBSITE_REGEX,
} from "../../../../../utils/patterns";
import { InputWithPhoneMask } from "../../../../fragments/Forms/Input/WithMask/Phone";

const setFormPath = (value) => `basics.businessInformation.${value}`;
const getErrorPath = (errors) => errors?.basics?.businessInformation;

export const FormBasicBusinessInformation = () => {
  const form = useWatch();
  const { setSection } = useStepWizard();
  const {
    register,
    control,
    formState: { isValid, errors },
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
              required: "First name is required.",
            })}
            error={getErrorPath(errors)?.firstName}
            label="First Name"
            required
          />
          <Input
            {...register(setFormPath("lastName"), {
              required: "Last name is required.",
            })}
            error={getErrorPath(errors)?.lastName}
            label="Last Name"
            required
          />
        </div>
        <Input
          {...register(setFormPath("business.email"), {
            required: "Email is required.",
            pattern: {
              value: EMAIL_REGEX,
              message: "This should be an email.",
            },
          })}
          error={getErrorPath(errors)?.business?.email}
          label="Business Email"
          type="email"
          required
        />
        <Controller
          name={setFormPath("business.phone")}
          control={control}
          defaultValue=""
          rules={{
            required: "Phone number is required.",
            pattern: {
              value: PHONE_REGEX,
              message: "The value should be a valid phone number.",
            },
          }}
          render={({ field, fieldState }) => (
            <InputWithPhoneMask {...field} error={fieldState.error} />
          )}
        />
        <Input
          {...register(setFormPath("business.website"), {
            pattern: {
              value: WEBSITE_REGEX,
              message: "This should be a valid website address.",
            },
          })}
          error={getErrorPath(errors)?.business?.website}
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
