import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { BusinessInformationAddress } from "./Address";
import { Input } from "../../../../fragments/Forms/Input";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { InputWithMask } from "../../../../fragments/Forms/Input/WithMask";
import { Card, CardActions, CardContent } from "../../../../fragments/Card";
import { LiferayService } from "../../../../../services/liferay";

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
    <Card>
      <CardContent>
        <div className="content-row">
          <Input
            {...register(setFormPath("firstName"), {
              required: true,
            })}
            label="First Name"
          />
          <Input
            {...register(setFormPath("lastName"), {
              required: true,
            })}
            label="Last Name"
          />
        </div>
        <Input
          {...register(setFormPath("business.email"), {
            required: true,
          })}
          label="Business Email"
          type="email"
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
              format="###-###-####"
              mask="_"
            />
          )}
        />
        <Input
          {...register(setFormPath("business.website"))}
          label="Business Website (optional)"
        />
        <BusinessInformationAddress />
      </CardContent>
      <CardActions>
        <button className="btn btn-flat" onClick={goToPreviousForm}>
          Previous
        </button>
        <div>
          <button className="btn btn-outline">Save & Exit</button>
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={goToNextForm}
            disabled={!isValid}
          >
            Continue
          </button>
        </div>
      </CardActions>
    </Card>
  );
};
