import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Radio } from "../../../fragments/Forms/Radio";
import { AVAILABLE_STEPS } from "../../../../utils/constants";
import { useStepWizard } from "../../../../hooks/useStepWizard";
import { InputLabel } from "../../../fragments/Forms/Input/styles";
import { BadgeButton, SecondarySolidButton } from "../../../fragments/Button";
import { useProductQuotes } from "../../../../hooks/useProductQuotes";
import { Card, CardActions, CardContent } from "../../../fragments/Card";

export const FormBasicProductQuote = () => {
  const form = useWatch();
  const { setSection } = useStepWizard();
  const { productQuotes } = useProductQuotes();
  const { register } = useFormContext();

  const goToNextForm = () => setSection(AVAILABLE_STEPS.BUSINESS);

  return (
    <Card>
      <CardContent>
        <div className="content-column">
          <InputLabel>Select a product to quote.</InputLabel>
          <fieldset id="productQuote" className="content-column">
            {productQuotes.map((quote) => (
              <Radio
                key={quote.id}
                name="productQuote"
                label={quote.title}
                sideLabel={quote.period}
                description={quote.description}
                value={quote.id}
                selected={quote.id === form.basics.productQuote}
                renderActions={<BadgeButton>More Info</BadgeButton>}
                {...register("basics.productQuote", { required: true })}
              />
            ))}
          </fieldset>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <SecondarySolidButton
          type="submit"
          onClick={goToNextForm}
          disabled={!form.basics.productQuote}
        >
          Continue
        </SecondarySolidButton>
      </CardActions>
    </Card>
  );
};
