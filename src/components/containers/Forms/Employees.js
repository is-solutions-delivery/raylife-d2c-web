import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { AVAILABLE_STEPS } from "../../../utils/constants";
import { useStepWizard } from "../../../hooks/useStepWizard";
import { INPUT_INFO_EVENT } from "../../../events";
import { CardFormActionsWithSave } from "../../fragments/Card/FormActionsWithSave";
import { ControlledSwitch } from "../../connectors/Controlled/Switch";
import { NumberControlledInput } from "../../connectors/Controlled/Input/Number";
import { FEINControlledInput } from "../../connectors/Controlled/Input/WithMask/FEIN";
import { YearControlledInput } from "../../connectors/Controlled/Input/WithMask/Year";
import { CurrencyControlledInput } from "../../connectors/Controlled/Input/WithMask/Currency";

const setFormPath = (value) => `employees.${value}`;

const hasFein = (value) => value === "true";

export const FormEmployees = () => {
  const {
    control,
    formState: { isValid },
  } = useFormContext();
  const form = useWatch();
  const { setSection } = useStepWizard();

  const goToPreviousForm = () => setSection(AVAILABLE_STEPS.BUSINESS);

  const goToNextForm = () => setSection(AVAILABLE_STEPS.PROPERTY);

  return (
    <div className="card">
      <div className="card-content">
        <ControlledSwitch
          name={setFormPath("hasFein")}
          label="Does your business have a Federal Employer Identification Number (FEIN)?"
          rules={{ required: true }}
          control={control}
        />
        {hasFein(form?.employees?.hasFein) && (
          <FEINControlledInput
            name={setFormPath("fein")}
            label="Federal Employer Identification Number (FEIN)"
            rules={{
              required: "FEIN is required.",
            }}
            control={control}
          />
        )}
        <YearControlledInput
          name={setFormPath("startBusinessAtYear")}
          label="What year did you start your business?"
          rules={{ required: "This field is required" }}
          control={control}
        />
        <ControlledSwitch
          name={setFormPath("businessOperatesYearRound")}
          label="Does your business operate year round?"
          rules={{ required: true }}
          control={control}
        />
        <NumberControlledInput
          name={setFormPath("partTimeEmployees")}
          label="How many full or part time employees do you have?"
          rules={{
            required: "This field is required",
            min: {
              value: 0,
              message: "Must be equal or grater than 0.",
            },
          }}
          moreInfoProps={{
            event: INPUT_INFO_EVENT,
            value: "partTimeEmployees",
          }}
          control={control}
        />
        <CurrencyControlledInput
          name={setFormPath("estimatedAnnualGrossRevenue")}
          label="What is your estimated annual gross revenue for the next 12 months?"
          rules={{ required: "This field is required" }}
          control={control}
        />
        <CurrencyControlledInput
          name={setFormPath("annualPayrollForOwner")}
          label="What do you anticipate your annual payroll will be for all owner(s) over the next 12 months?"
          rules={{ required: "This field is required" }}
          control={control}
        />
        <CurrencyControlledInput
          name={setFormPath("annualPayrollForEmployees")}
          label="What do you anticipate your annual payroll will be for all employees over the next 12 months?"
          rules={{ required: "This field is required" }}
          control={control}
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
