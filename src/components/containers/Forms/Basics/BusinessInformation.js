import React, { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "../../../fragments/Forms/Input";
import { useLocation } from "../../../../hooks/useLocation";
import { AVAILABLE_STEPS } from "../../../../utils/constants";
import { useStepWizard } from "../../../../hooks/useStepWizard";
import { SelectInput } from "../../../fragments/Forms/Input/Select";
import { InputWithMask } from "../../../fragments/Forms/Input/WithMask";
import { Card, CardActions, CardContent } from "../../../fragments/Card";
import {
  FlatButton,
  OutlineButton,
  SecondarySolidButton,
} from "../../../fragments/Button";

const setFormPath = (value) => `basics.business-information.${value}`;

export const FormBasicBusinessInformation = () => {
  const ref = useRef();
  const { setSection } = useStepWizard();
  const { states, setAutoComplete } = useLocation();
  const {
    register,
    control,
    setValue,
    formState: { isValid },
  } = useFormContext();

  useEffect(() => {
    if (ref.current) setAutoComplete(ref.current, updateFormWithGoogleAddress);
  }, [ref]);

  const updateFormWithGoogleAddress = (address) => {
    setValue(setFormPath("business.location.city"), address.city);
    setValue(setFormPath("business.location.state"), address.state);
    setValue(setFormPath("business.location.zip"), address.zip);
    setValue(
      setFormPath("business.location.address"),
      `${address.streetNumber}, ${address.street}`
    );
  };

  const goToPreviousForm = () =>
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_TYPE);

  const goToNextForm = () => setSection(AVAILABLE_STEPS.BASICS_PRODUCT_QUOTE);

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
        <div
          className="content-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 35%",
          }}
        >
          <Controller
            name={setFormPath("business.location.address")}
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Physical Business Address"
                placeholder="Street address"
                ref={ref}
              />
            )}
          />
          <Input
            {...register(setFormPath("business.location.addressApt"))}
            placeholder="Apt/Suite (optional)"
          />
        </div>

        <div
          className="content-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 15% 25%",
          }}
        >
          <Input
            {...register(setFormPath("business.location.city"), {
              required: true,
            })}
            label="City"
          />
          <SelectInput
            {...register(setFormPath("business.location.state"), {
              maxLength: 2,
              pattern: /[A-Za-z]/g,
              required: true,
              value: "AL",
            })}
            label="State"
            maxLength={2}
          >
            {states.map(({ abbreviation }, index) => (
              <option key={`${abbreviation}-${index}`} value={abbreviation}>
                {abbreviation}
              </option>
            ))}
          </SelectInput>
          <Input
            {...register(setFormPath("business.location.zip"), {
              minLength: 5,
              required: true,
              pattern: /[0-9]/g,
            })}
            label="ZIP"
            maxLength={5}
          />
        </div>
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
