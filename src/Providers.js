import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AppProvider } from "./context/AppContext";
import { Template } from "./components/Template";

export const Providers = ({ children }) => {
  const form = useForm();

  return (
    <AppProvider>
      <FormProvider {...form}>
        <Template>{children}</Template>
      </FormProvider>
    </AppProvider>
  );
};
