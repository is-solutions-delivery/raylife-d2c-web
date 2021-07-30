import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "../../fragments/Forms/Input";
import { Switch } from "../../fragments/Forms/Switch";
import { AVAILABLE_STEPS } from "../../../utils/constants";
import { useStepWizard } from "../../../hooks/useStepWizard";
import { MoreInfoButton } from "../../fragments/Buttons/MoreInfo";
import { INPUT_INFO_EVENT } from "../../../events";
import { CardFormActionsWithSave } from "../../fragments/Card/FormActionsWithSave";
import { InputWithPercentageMask } from "../../fragments/Forms/Input/WithMask/Percentage";

const setFormPath = (value) => `business.${value}`;
const getErroPath = (errors) => errors?.business;

export const FormBusiness = () => {
  const {
    register,
    control,
    formState: { isValid, errors },
  } = useFormContext();
  const { setSection } = useStepWizard();

  const goToPreviousForm = () =>
    setSection(AVAILABLE_STEPS.BASICS_PRODUCT_QUOTE);

  const goToNextForm = () => setSection(AVAILABLE_STEPS.EMPLOYEES);

  return (
    <div className="card">
      <div className="card-content">
        <Input
          label="Years of industry experience?"
          type="number"
          min={0}
          required
          error={getErroPath(errors)?.yearsOfExperience}
          renderActions={
            <MoreInfoButton
              event={INPUT_INFO_EVENT}
              value="yearsOfExperience"
            />
          }
          {...register(setFormPath("yearsOfExperience"), {
            required: "Years of industry experience is required.",
            min: {
              value: 0,
              message: "Must be equal or grater than 0.",
            },
          })}
        />
        <Controller
          name={setFormPath("hasStoredCustomerInformation")}
          defaultValue="false"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Switch
              {...field}
              label="Do you store personally identifiable information about your customers?"
              required
            />
          )}
        />
        <Controller
          name={setFormPath("hasAutoPolicy")}
          defaultValue="false"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Switch
              {...field}
              label="Do you have a Raylife Auto policy?"
              required
            />
          )}
        />
        <Controller
          name={setFormPath("salesMerchandise")}
          control={control}
          defaultValue=""
          rules={{ required: "Percent of sales is required." }}
          render={({ field, fieldState }) => (
            <InputWithPercentageMask
              {...field}
              renderActions={
                <MoreInfoButton
                  event={INPUT_INFO_EVENT}
                  value="salesMerchandise"
                />
              }
              label="Percent of sales from used merchandise?"
              error={fieldState.error}
              required
            />
          )}
        />
        <Controller
          name={setFormPath("hasSellProductsUnderOwnBrand")}
          defaultValue="false"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Switch
              {...field}
              label="Do you sell products under your own brand or label?"
              required
            />
          )}
        />
      </div>
      <CardFormActionsWithSave
        onPrevious={goToPreviousForm}
        onNext={goToNextForm}
        isValid={isValid}
      />
    </div>
  );
};
