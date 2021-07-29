import React from "react";
import { useFormContext } from "react-hook-form";

import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { BusinessTypeSearch } from "./Search";
import { CardFormActions } from "../../../../fragments/Card/FormActions";

export const FormBasicBusinessType = () => {
  const { setSection } = useStepWizard();
  const {
    formState: { isValid },
  } = useFormContext();

  const goToNextForm = () => {
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_INFORMATION);
  };

  return (
    <div className="card">
      <div className="card-content">
        <BusinessTypeSearch />
      </div>
      <CardFormActions onNext={goToNextForm} isValid={isValid} />
    </div>
  );
};
