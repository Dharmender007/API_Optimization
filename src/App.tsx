
import React from "react";
import WeatherDisplay from "./components/Weather";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { theme } from "./Styles/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <WeatherDisplay />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

