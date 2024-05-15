import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import { GoCheckCircle } from "react-icons/go";
import { GoCheckCircleFill } from "react-icons/go";

import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9-]+$/, "Invalid phone number")
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};
export default function ContactForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ errors, isValid }) => (
        <Form className={css.form}>
          <label htmlFor={nameId} className={css.label}>
            Name{" "}
            {errors.name ? (
              <GoCheckCircle className={css.check} />
            ) : (
              <GoCheckCircleFill className={css.check} />
            )}
          </label>
          <Field className={css.input} id={nameId} name="name"></Field>
          <ErrorMessage
            className={css.errorName}
            name="name"
            component="span"
          />
          <label htmlFor={numberId} className={css.label}>
            Number{" "}
            {errors.number ? (
              <GoCheckCircle className={css.check} />
            ) : (
              <GoCheckCircleFill className={css.check} />
            )}
          </label>
          <Field
            type="tel"
            className={css.input}
            id={numberId}
            name="number"
          ></Field>
          <ErrorMessage
            className={css.errorNumber}
            name="number"
            component="span"
          />
          <button
            className={css.addContactBtn}
            type="submit"
            disabled={!isValid}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
