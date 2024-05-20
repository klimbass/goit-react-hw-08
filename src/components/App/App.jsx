import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  selectIsRefreshing,
  selectToastError,
  selectToastSuccess,
} from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b7c71",
    },
    secondary: {
      main: "#dc143c",
    },
  },
});

import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const PrivateRoute = lazy(() => import("../PrivateRoute/PrivateRoute"));
const RestrictedRoute = lazy(() =>
  import("../RestrictedRoute/RestrictedRoute")
);
const UserPage = lazy(() => import("../../pages/UserPage/UserPage"));

function App() {
  const toastSuccess = useSelector(selectToastSuccess);
  const toastError = useSelector(selectToastError);
  useEffect(() => {
    if (toastSuccess) toast.success("Successful!");
    if (toastError) toast.error("Something went wrong..");
  }, [toastSuccess, toastError]);

  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {isRefreshing ? (
          <b>Refreshing...</b>
        ) : (
          <Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    component={<RegistrationPage />}
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    component={<LoginPage />}
                    redirectTo="/contacts"
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute
                    component={<ContactsPage />}
                    redirectTo="/login"
                  />
                }
              />
              <Route
                path="/userpage"
                element={
                  <PrivateRoute component={<UserPage />} redirectTo="/login" />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
        <Toaster />;
      </Layout>
    </ThemeProvider>
  );
}

export default App;
