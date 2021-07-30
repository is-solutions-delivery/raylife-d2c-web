/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useLocation } from "../../../../../hooks/useLocation";
import { ZIP_REGEX } from "../../../../../utils/patterns";
import { Input } from "../../../../fragments/Forms/Input";
import { SelectInput } from "../../../../fragments/Forms/Input/Select";
import { InputWithMask } from "../../../../fragments/Forms/Input/WithMask";

const setFormPath = (value) =>
  `basics.businessInformation.business.location.${value}`;
const getErrorPath = (errors) =>
  errors?.basics?.businessInformation?.business?.location;

export const BusinessInformationAddress = () => {
  const ref = useRef();
  const { states, setAutoComplete } = useLocation();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (ref.current) setAutoComplete(ref.current, updateFormWithGoogleAddress);
  }, [ref]);

  const updateFormWithGoogleAddress = (address) => {
    setValue(setFormPath("city"), address.city);
    setValue(setFormPath("state"), address.state);
    setValue(setFormPath("zip"), address.zip);
    setValue(
      setFormPath("address"),
      `${address.streetNumber}, ${address.street}`
    );
  };

  return (
    <>
      <div
        className="content-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 35%",
        }}
      >
        <Controller
          name={setFormPath("address")}
          control={control}
          defaultValue=""
          rules={{ required: "Business address is required." }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              ref={ref}
              error={fieldState.error}
              label="Physical Business Address"
              placeholder="Street address"
              required
            />
          )}
        />
        <Input
          {...register(setFormPath("addressApt"))}
          label="&nbsp;"
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
          {...register(setFormPath("city"), {
            required: "City is required.",
          })}
          error={getErrorPath(errors)?.city}
          label="City"
          required
        />
        <SelectInput
          {...register(setFormPath("state"), {
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
        <Controller
          name={setFormPath("zip")}
          control={control}
          defaultValue=""
          rules={{
            required: "ZIP is required.",
            pattern: {
              value: ZIP_REGEX,
              message: "ZIP must be a five digit number.",
            },
          }}
          render={({ field, fieldState }) => (
            <InputWithMask
              {...field}
              error={fieldState.error}
              format="#####"
              label="ZIP"
              mask="_"
              required
            />
          )}
        />
      </div>
    </>
  );
};
