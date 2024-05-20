import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import css from "./LoginPage.module.css";

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
        {({ errors, isValid, touched }) => (
          <Form className={css.form}>
            <Field
              id={email}
              name="email"
              as={TextField}
              variant="outlined"
              label="Email"
              fullWidth
              error={touched.email && Boolean(errors.email)}
            ></Field>
            <ErrorMessage
              className={css.errorEmail}
              name="email"
              component="span"
            />

            <Field
              id={password}
              name="password"
              as={TextField}
              variant="outlined"
              label="Password"
              fullWidth
              error={touched.password && Boolean(errors.password)}
            ></Field>
            <ErrorMessage
              className={css.errorPass}
              name="password"
              component="span"
            />

            <Button
              className={css.btnLogin}
              type="submit"
              disabled={!isValid}
              variant="contained"
            >
              Log in
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/register" className={css.reg}>
        -or registration-
      </Link>
    </div>
  );
}
