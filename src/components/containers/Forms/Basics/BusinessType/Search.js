/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useDebounce from "lodash.debounce";

import { WarningBadge } from "../../../../fragments/Badges/Warning";
import { InputSearch } from "../../../../fragments/Forms/Input/Search";
import { useBusinessTypes } from "../../../../../hooks/useBusinessTypes";
import { BusinessTypeRadioGroup } from "./RadioGroup";

export const BusinessTypeSearch = () => {
  const form = useWatch();
  const { register, setValue } = useFormContext();
  const { businessTypes, isLoading, reload } = useBusinessTypes();

  useEffect(() => {
    onSearch(form?.basics?.businessSearch);
  }, [form?.basics?.businessSearch]);

  const onSearch = useCallback(
    useDebounce((searchTerm = "") => {
      if (!searchTerm.length) setValue("basics.businessCategoryId", "");
      return reload(searchTerm);
    }, 500),
    []
  );

  const renderResults = () => {
    if (isLoading || !form?.basics?.businessSearch) return;

    if (!businessTypes.length)
      return (
        <WarningBadge>
          There are no results for “{form?.basics?.businessSearch}”. Please try
          a different search.
        </WarningBadge>
      );

    return <BusinessTypeRadioGroup businessTypes={businessTypes} />;
  };

  return (
    <>
      <div className="content-column">
        <InputSearch
          label="Search for your primary industry and then select it from the list."
          defaultValue=""
          required
          {...register("basics.businessSearch")}
        >
          <button
            type="button"
            className="btn btn-primary"
            style={{ height: "3rem" }}
            onClick={() => onSearch(form?.basics?.businessSearch)}
          >
            Search
          </button>
        </InputSearch>
        <p className="paragraph">
          i.e. Coffee shop, Plumber, Drop Shipping, Landscape, etc
        </p>
      </div>
      {renderResults()}
    </>
  );
};
