import React from "react";
import { useFormContext } from "react-hook-form";

import { BusinessTypeRadioGroup } from "./RadioGroup";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import { FlatButton, SecondarySolidButton } from "../../../../fragments/Button";
import { TypographyParagraph } from "../../../../fragments/Typography";
import { useBusinessTypes } from "../../../../../hooks/useBusinessTypes";
import { Card, CardActions, CardContent } from "../../../../fragments/Card";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";
import { BusinessTypeSearch } from "./Search";

export const FormBasicBusinessType = () => {
  const { setSection } = useStepWizard();
  const { businessTypes, reload } = useBusinessTypes();
  const {
    formState: { isValid },
  } = useFormContext();

  const goToNextForm = () => {
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_INFORMATION);
  };

  return (
    <Card>
      <CardContent>
        <div className="content-column">
          <BusinessTypeSearch searchBusinessType={reload} />
          <TypographyParagraph>
            i.e. Coffee shop, Plumber, Drop Shipping, Landscape, etc
          </TypographyParagraph>
        </div>
        <BusinessTypeRadioGroup businessTypes={businessTypes} />
      </CardContent>
      <CardActions>
        <FlatButton>Previous</FlatButton>
        <SecondarySolidButton
          type="submit"
          onClick={goToNextForm}
          disabled={!isValid}
        >
          Continue
        </SecondarySolidButton>
      </CardActions>
    </Card>
  );
};
