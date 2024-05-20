import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const nameId = useId();
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
      {({ errors, isValid, touched }) => (
        <Form className={css.form}>
          <h2>Registration:</h2>
          <Field
            id={nameId}
            name="name"
            as={TextField}
            variant="outlined"
            label="Name"
            fullWidth
            error={touched.name && Boolean(errors.name)}
          ></Field>
          <ErrorMessage
            className={css.errorName}
            name="name"
            component="span"
          />
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
