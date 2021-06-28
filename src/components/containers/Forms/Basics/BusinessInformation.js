import React, { useEffect } from "react";
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
  const { setSection } = useStepWizard();
  const { register, control, formState, setValue } = useFormContext();
  const { states, setAutoComplete } = useLocation();

  useEffect(() => {
    setAutoComplete("business-address-input", updateFormWithGoogleAddress);
  }, []);

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
            name="firstName"
            label="First Name"
            {...register(setFormPath("firstName"), {
              required: true,
            })}
          />
          <Input
            name="lastName"
            label="Last Name"
            {...register(setFormPath("lastName"), {
              required: true,
            })}
          />
        </div>
        <Input
          name="email"
          label="Business Email"
          type="email"
          {...register(setFormPath("business.email"), {
            required: true,
          })}
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
          name="businessWebsite"
          label="Business Website (optional)"
          {...register(setFormPath("business.website"))}
        />

        <div
          className="content-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 35%",
          }}
        >
          <Input
            id="business-address-input"
            name="businessAddress"
            label="Physical Business Address"
            placeholder="Street address"
            {...register(setFormPath("business.location.address"), {
              required: true,
            })}
          />
          <Input
            name="businessAddressApt"
            placeholder="Apt/Suite (optional)"
            {...register(setFormPath("business.location.addressApt"))}
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
            name="city"
            label="City"
            {...register(setFormPath("business.location.city"), {
              required: true,
            })}
          />
          <SelectInput
            name="state"
            label="State"
            maxLength={2}
            {...register(setFormPath("business.location.state"), {
              maxLength: 2,
              pattern: /[A-Za-z]/g,
              required: true,
              value: "AL",
            })}
          >
            {states.map(({ abbreviation }, index) => (
              <option key={`${abbreviation}-${index}`} value={abbreviation}>
                {abbreviation}
              </option>
            ))}
          </SelectInput>
          <Input
            name="zip"
            label="ZIP"
            maxLength={5}
            {...register(setFormPath("business.location.zip"), {
              minLength: 5,
              required: true,
              pattern: /[0-9]/g,
            })}
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
            disabled={!formState.isValid}
          >
            Continue
          </SecondarySolidButton>
        </div>
      </CardActions>
    </Card>
  );
};
