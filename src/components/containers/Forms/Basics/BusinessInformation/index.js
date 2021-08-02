import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { BusinessInformationAddress } from "./Address";
import { Input } from "../../../../fragments/Forms/Input";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { LiferayService } from "../../../../../services/liferay";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { CardFormActionsWithSave } from "../../../../fragments/Card/FormActionsWithSave";
import { EmailControlledInput } from "../../../../connectors/Controlled/Input/Email";
import { WebsiteControlledInput } from "../../../../connectors/Controlled/Input/Website";
import { PhoneControlledInput } from "../../../../connectors/Controlled/Input/WithMask/Phone";

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
        <EmailControlledInput
          name={setFormPath("business.email")}
          label="Business Email"
          rules={{
            required: "Email is required.",
          }}
          control={control}
        />
        <PhoneControlledInput
          name={setFormPath("business.phone")}
          label="Phone"
          rules={{
            required: "Phone number is required.",
          }}
          control={control}
        />
        <WebsiteControlledInput
          name={setFormPath("business.website")}
          label="Business Website (optional)"
          control={control}
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
