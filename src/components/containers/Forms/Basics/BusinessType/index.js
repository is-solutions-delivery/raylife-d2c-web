import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { BusinessTypeRadioGroup } from "./RadioGroup";
import { Input } from "../../../../fragments/Forms/Input";
import { useStepWizard } from "../../../../../hooks/useStepWizard";
import {
  FlatButton,
  PrimarySolidButton,
  SecondarySolidButton,
} from "../../../../fragments/Button";
import { TypographyParagraph } from "../../../../fragments/Typography";
import { useBusinessTypes } from "../../../../../hooks/useBusinessTypes";
import { Card, CardActions, CardContent } from "../../../../fragments/Card";
import { AVAILABLE_STEPS } from "../../../../../utils/constants";

export const FormBasicBusinessType = () => {
  const form = useWatch();
  const { setSection } = useStepWizard();
  const { register, setValue } = useFormContext();
  const { businessTypes, reload } = useBusinessTypes();

  useEffect(() => {
    onSearchInput();
  }, [form]);

  const onSearchInput = () => {
    const { basics: { businessSearch, businessType } = {} } = form;

    if (!businessSearch?.length && businessType)
      setValue("basics.businessType", "");

    return reload(businessSearch);
  };

  const goToNextForm = () => {
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_INFORMATION);
  };

  return (
    <Card>
      <CardContent>
        <div className="content-column">
          <div className="content-row">
            <Input
              name="businessSearch"
              label="Search for your primary industry and then select it from the list."
              defaultValue=""
              {...register("basics.businessSearch")}
            />
            <PrimarySolidButton
              onClick={onSearchInput}
              style={{ height: "3rem" }}
            >
              Search
            </PrimarySolidButton>
          </div>
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
          disabled={!form?.basics?.businessType}
        >
          Continue
        </SecondarySolidButton>
      </CardActions>
    </Card>
  );
};
