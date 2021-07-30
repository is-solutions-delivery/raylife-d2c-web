/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useWatch } from "react-hook-form";

import { setSelectedStep } from "../context/actions";
import { AppContext } from "../context/AppContext";
import { calculatePercentage, countCompletedFields } from "../utils";
import { AVAILABLE_STEPS, TOTAL_OF_FIELD } from "../utils/constants";

export const useStepWizard = () => {
  const form = useWatch();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    _updateStepPercentage();
  }, [form]);

  const _updateStepPercentage = () => {
    switch (state.selectedStep.section) {
      case AVAILABLE_STEPS.BASICS_BUSINESS_TYPE.section:
        return setPercentage(
          calculatePercentage(
            countCompletedFields(form?.basics || {}),
            TOTAL_OF_FIELD.BASICS
          )
        );

      case AVAILABLE_STEPS.BUSINESS.section:
        return setPercentage(
          calculatePercentage(
            countCompletedFields(form?.business || {}),
            TOTAL_OF_FIELD.BUSINESS
          )
        );

      case AVAILABLE_STEPS.EMPLOYEES.section:
        return setPercentage(
          calculatePercentage(
            countCompletedFields(form?.employees || {}),
            TOTAL_OF_FIELD.EMPLOYEES
          )
        );

      case AVAILABLE_STEPS.PROPERTY.section:
        return setPercentage(
          calculatePercentage(
            countCompletedFields(form?.property || {}),
            TOTAL_OF_FIELD.PROPERTY
          )
        );

      default:
        return setPercentage(0);
    }
  };

  const setSection = (step) =>
    dispatch(
      setSelectedStep({
        ...state.selectedStep,
        ...step,
      })
    );

  const setPercentage = (percentage = 0) =>
    dispatch(
      setSelectedStep({
        ...state.selectedStep,
        percentage,
      })
    );

  return {
    selectedStep: state.selectedStep,
    setSection,
    setPercentage,
  };
};
