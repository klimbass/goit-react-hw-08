import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches( /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "Invalid phone number")
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

const initialValues = {
  name: "",
  phoneNumber: "",
};
export default function ContactForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
console.log(values);

    dispatch(addContact(values));
    toast.success("Added successfully!!");

    actions.resetForm();
  };

  return (
    <div>
      <Toaster />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ContactSchema}
      >
        {({ errors, isValid, touched }) => (
          <Form className={css.form}>
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
              type="tel"
              id={numberId}
              name="phoneNumber"
              label="Number"
              as={TextField}
              variant="outlined"
              fullWidth
              error={touched.name && Boolean(errors.name)}
            ></Field>
            <ErrorMessage
              className={css.errorNumber}
              name="phoneNumber"
              component="span"
            />
            <Button
              className={css.addContactBtn}
              variant="contained"
              type="submit"
              disabled={!isValid}
              color="primary"
            >
              Add contact
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
