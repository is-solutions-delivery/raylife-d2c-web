import React from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";

import { Radio } from "../../../fragments/Forms/Radio";
import { AVAILABLE_STEPS } from "../../../../utils/constants";
import { useStepWizard } from "../../../../hooks/useStepWizard";
import { InputLabel } from "../../../fragments/Forms/Input/styles";
import {
  BadgeButton,
  FlatButton,
  SecondarySolidButton,
} from "../../../fragments/Button";
import { useProductQuotes } from "../../../../hooks/useProductQuotes";
import { Card, CardActions, CardContent } from "../../../fragments/Card";

export const FormBasicProductQuote = () => {
  const form = useWatch();
  const { setSection } = useStepWizard();
  const { productQuotes } = useProductQuotes();
  const {
    control,
    formState: { isValid },
  } = useFormContext();

  const goToNextForm = () => setSection(AVAILABLE_STEPS.BUSINESS);

  const goToPreviousForm = () =>
    setSection(AVAILABLE_STEPS.BASICS_BUSINESS_INFORMATION);

  return (
    <Card>
      <CardContent>
        <div className="content-column">
          <InputLabel>Select a product to quote.</InputLabel>
          <fieldset id="productQuote" className="content-column">
            <Controller
              name="basics.productQuote"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                productQuotes.map((quote) => (
                  <Radio
                    {...field}
                    key={quote.id}
                    label={quote.title}
                    sideLabel={quote.period}
                    description={quote.description}
                    value={quote.id}
                    selected={quote.id === form.basics.productQuote}
                    renderActions={<BadgeButton>More Info</BadgeButton>}
                  />
                ))
              }
            />
          </fieldset>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <FlatButton onClick={goToPreviousForm}>Previous</FlatButton>
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
