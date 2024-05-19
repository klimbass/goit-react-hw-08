import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

import css from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NotFound from "../../pages/NotFound/NotFound";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import UserPage from "../../pages/UserPage/UserPage";

// Додайте маршрутизацію з бібліотекою React Router. Компоненти сторінок додайте у папку src/pages. Для обгортки компонентів публічних і приватних сторінок використовуйте компоненти PrivateRoute та RestrictedRoute.
// У застосунку мають бути наступні маршрути:
// / - маршрут домашньої сторінки додатка, де можна розмістити інформацію про додаток чи його розробника. Рендерить компонент HomePage.
// /register - публічний маршрут для реєстрації нового користувача, на якому рендериться компонент сторінки RegistrationPage з формою RegistrationForm.
// /login - публічний маршрут для логіна існуючого користувача, на якому рендериться компонент сторінки LoginPage з формою LoginForm.
// /contacts - приватний маршрут для роботи зі списком контактів користувача, на якому рендериться компонент сторінки ContactsPage.
// Створіть компонент Layout, який буде рендерити компонент AppBar і огортати усі маршрути, щоб бути доступним на кожному із них.
// Компонент AppBar має рендерити компонент навігації Navigation та AuthNav. Водночас авторизований користувач замість AuthNav має бачити UserMenu.
// Обов’язково очищайте колекцію контактів у стані при логауті користувача.
// При перезавантаженні сторінки /contacts необхідно забезпечити збереження статусу авторизації користувача. Це означає, що система повинна автоматично відновлювати авторизований стан користувача без необхідності повторного введення логіна та пароля.

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const error = useSelector(selectError);
  useEffect(() => {
    console.log(isRefreshing);
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <b>Refreshing...</b>
      ) : (
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
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route
            path="/userpage"
            element={
              <PrivateRoute component={<UserPage />} redirectTo="/login" />
            }
          />
          {/* <Route path="/userpage" element={<UserPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
