import React from "react";

import { TypographyTitle } from "./components/fragments/Typography";
import { Steps } from "./components/containers/Steps";
import { Forms } from "./components/containers/Forms";
import { useFormContext, useWatch } from "react-hook-form";
import { useStepWizard } from "./hooks/useStepWizard";
import { AVAILABLE_STEPS } from "./utils/constants";

export const App = () => {
  const form = useWatch();
  const { handleSubmit } = useFormContext();
  const { selectedStep } = useStepWizard();

  const onSubmit = (data) => console.log(data);

  const _renderTitle = () => {
    if (selectedStep.section !== AVAILABLE_STEPS.PROPERTY.section)
      return selectedStep.title;
    else
      return (
        <>
          {selectedStep.title}
          <span className="primary">
            {form.basics.businessInformation.business.location.address}
          </span>
        </>
      );
  };

  return (
    <>
      <TypographyTitle className="title-area">{_renderTitle()}</TypographyTitle>
      <div className="form-area">
        <Steps />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Forms />
        </form>
        <div className="info-area"></div>
      </div>
    </>
  );
};
