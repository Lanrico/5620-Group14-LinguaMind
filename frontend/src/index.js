import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from './components/userProfileInfo/store';

import SignUpPage from "./pages/signUpPage";
import AuthContext from "./context/authContext";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#3accc0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff1688',
      contrastText: '#fff',
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <AuthContext>
              <Routes>
                <Route path="" element={<LoginPage />} />
                {/* <Route path="/register" element={<SignUpPage />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/main/:user_id/:tab?" element={<HomePage />} />
              </Routes>
            </AuthContext>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);