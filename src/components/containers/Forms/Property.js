import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

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

const setFormPath = (value) => `property.${value}`;

export const FormProperty = () => {
  const form = useWatch();
  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext();
  const { setSection } = useStepWizard();

  const goToPreviousForm = () => setSection(AVAILABLE_STEPS.EMPLOYEES);

  return (
    <Card>
      <CardContent>
        <Controller
          name={setFormPath("doOwnBuildingAtAddress")}
          defaultValue="false"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Switch
              {...field}
              label={`Do you own the building at ${form.basics["business-information"].business.location.address}?`}
            />
          )}
        />
        <Input
          name="stories"
          label="How many stories is this building?"
          type="number"
          min={0}
          {...register(setFormPath("stories"), {
            required: true,
          })}
        />
        <Controller
          name={setFormPath("buildingSquareFeetOccupied")}
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputWithMask
              {...field}
              renderActions={<BadgeButton>More Info</BadgeButton>}
              label="How many square feet of the building does your business occupy?"
              suffix=" ft²"
              thousandSeparator
            />
          )}
        />
        <Controller
          name={setFormPath("totalBuildingSquareFeet")}
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputWithMask
              {...field}
              label="How many total square feet is the building?"
              suffix=" ft²"
              thousandSeparator
            />
          )}
        />
        <Controller
          name={setFormPath("yearBuilding")}
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputWithMask
              {...field}
              renderActions={<BadgeButton>More Info</BadgeButton>}
              label="What year was the building constructed?"
              format="####"
              mask="_"
            />
          )}
        />
        <Controller
          name={setFormPath("isPrimaryBusinessLocation")}
          control={control}
          defaultValue="false"
          rules={{ required: true }}
          render={({ field }) => (
            <Switch
              {...field}
              renderActions={<BadgeButton>More Info</BadgeButton>}
              label="Is this the primary location you conduct business?"
            />
          )}
        />
      </CardContent>
      <CardActions>
        <FlatButton onClick={goToPreviousForm}>Previous</FlatButton>
        <div>
          <OutlineButton>Save & Exit</OutlineButton>
          <SecondarySolidButton type="submit" disabled={!isValid}>
            Get a quote
          </SecondarySolidButton>
        </div>
      </CardActions>
    </Card>
  );
};
