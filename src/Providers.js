import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ThemeProvider } from "styled-components";
import { Template } from "./components/template";

import { AppProvider } from "./context/AppContext";
import { GlobalStyle } from "./styles/global";
import { Theme } from "./styles/theme";

export const Providers = ({ children }) => {
  const form = useForm();

  return (
    <AppProvider>
      <FormProvider {...form}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Template>{children}</Template>
        </ThemeProvider>
      </FormProvider>
    </AppProvider>
  );
};
