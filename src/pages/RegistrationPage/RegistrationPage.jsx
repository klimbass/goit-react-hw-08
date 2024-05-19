import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./RegistrationPage.module.css";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const name = useId();
  const email = useId();
  const password = useId();

  const ValidateSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
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
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (e) => {
    console.log(e);
    dispatch(register(e));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidateSchema}
    >
      {({ errors, isValid }) => (
        <Form className={css.form}>
          <h2>Registration:</h2>
          <label htmlFor={name} className={css.label}>
            Username{" "}
            {errors.name ? (
              <GoCheckCircle className={css.check} />
            ) : (
              <GoCheckCircleFill className={css.check} />
            )}
          </label>
          <Field className={css.input} id={name} name="name"></Field>
          <ErrorMessage
            className={css.errorName}
            name="name"
            component="span"
          />
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
            Registered
          </button>
        </Form>
      )}
    </Formik>
  );
}
