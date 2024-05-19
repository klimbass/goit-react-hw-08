import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./LoginPage.module.css";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import { login } from "../../redux/auth/operations";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const email = useId();
  const password = useId();

  const ValidateSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .email("Please, enter valid e-mail.")
      .required("Required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (e) => {
    dispatch(login(e));
  };

  return (
    <div className={css.box}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ValidateSchema}
      >
        {({ errors, isValid }) => (
          <Form className={css.form}>
            <label htmlFor={email} className={css.label}>
              Email{" "}
              {errors.email ? (
                <GoCheckCircle className={css.check} />
              ) : (
                <GoCheckCircleFill className={css.check} />
              )}
            </label>
            <Field className={css.input} id={email} name="email"></Field>
            <ErrorMessage
              className={css.errorEmail}
              name="email"
              component="span"
            />
            <label htmlFor={password} className={css.label}>
              Password{" "}
              {errors.password ? (
                <GoCheckCircle className={css.check} />
              ) : (
                <GoCheckCircleFill className={css.check} />
              )}
            </label>
            <Field className={css.input} id={password} name="password"></Field>
            <ErrorMessage
              className={css.errorPass}
              name="password"
              component="span"
            />
            <button
              className={css.addContactBtn}
              type="submit"
              disabled={!isValid}
            >
              Log in
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/register" className={css.reg}>
        -or registration-
      </Link>
    </div>
  );
}
