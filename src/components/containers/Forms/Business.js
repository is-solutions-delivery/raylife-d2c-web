import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "../../fragments/Forms/Input";
import { Switch } from "../../fragments/Forms/Switch";
import { AVAILABLE_STEPS } from "../../../utils/constants";
import { useStepWizard } from "../../../hooks/useStepWizard";
import { InputWithMask } from "../../fragments/Forms/Input/WithMask";
import { Card, CardActions, CardContent } from "../../fragments/Card";
import {
  BadgeButton,
  FlatButton,
  OutlineButton,
  SecondarySolidButton,
} from "../../fragments/Button";

const setFormPath = (value) => `business.${value}`;

export const FormBusiness = () => {
  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext();
  const { setSection } = useStepWizard();

  const goToPreviousForm = () =>
    setSection(AVAILABLE_STEPS.BASICS_PRODUCT_QUOTE);

  const goToNextForm = () => setSection(AVAILABLE_STEPS.EMPLOYEES);

  return (
    <Card>
      <CardContent>
        <Input
          name="yearsOfExperience"
          label="Years of industry experience?"
          renderActions={<BadgeButton>More Info</BadgeButton>}
          type="number"
          min={0}
          {...register(setFormPath("yearsOfExperience"), {
            required: true,
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
            />
          )}
        />
        <Controller
          name={setFormPath("hasAutoPolicy")}
          defaultValue="false"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Switch {...field} label="Do you have a Raylife Auto policy?" />
          )}
        />
        <Controller
          name={setFormPath("salesMerchandise")}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <InputWithMask
              {...field}
              renderActions={<BadgeButton>More Info</BadgeButton>}
              label="Percent of sales from used merchandise?"
              suffix="%"
              mask="_"
              decimalScale={2}
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
            />
          )}
        />
      </CardContent>
      <CardActions>
        <FlatButton onClick={goToPreviousForm}>Previous</FlatButton>
        <div>
          <OutlineButton>Save & Exit</OutlineButton>
          <SecondarySolidButton
            type="submit"
            onClick={goToNextForm}
            disabled={!isValid}
          >
            Continue
          </SecondarySolidButton>
        </div>
      </CardActions>
    </Card>
  );
};
