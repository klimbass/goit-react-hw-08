import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useId, useState } from "react";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";
import { editContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import css from "./ModalEdit.module.css";

export default function ModalEdit({ handleToggleEdit, userId }) {
  const dispatch = useDispatch();
  const [contact, setContact] = useState("");
  const classListCancel = clsx(css.btn, css.btnCancel);
  const classListConfirm = clsx(css.btn, css.btnConfirm);
  const contactsList = useSelector(selectContacts);

  useEffect(() => {
    const item = contactsList.filter((item) => {
      return item.id === userId;
    });

    setContact(item[0]);
  }, [contactsList, userId]);

  const nameId = useId();
  const numberId = useId();

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short name!")
      .max(50, "Too long name!")
      .required("Required"),
    number: Yup.string()
      .matches(/^[0-9-]+$/, "Invalid phone number")
      .min(3, "Too short number!")
      .max(50, "Too long number!")
      .required("Required"),
  });

  const handleSubmit = (e) => {
    dispatch(
      editContact({
        contact: e,
        id: userId,
      })
    );
    handleToggleEdit();
    toast.success("Edit successful!");
  };
  const initialValues = {
    name: contact.name || "",
    number: contact.number || "",
  };

  return (
    <div className={css.modalBox}>
      <Toaster />
      <div className={css.modal}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ContactSchema}
          enableReinitialize
        >
          {({ errors, isValid, dirty, touched }) => (
            <Form className={css.form}>
              <p className={css.title}>Edit contact:</p>
              {/* <label htmlFor={nameId} className={css.label}>
                {errors.name ? (
                  <GoCheckCircle className={css.check} />
                ) : (
                  <GoCheckCircleFill className={css.check} />
                )}
              </label> */}
              {/* <Field className={css.input} id={nameId} name="name"></Field> */}
              {/* <ErrorMessage
                className={css.errorName}
                name="name"
                component="span"
              /> */}
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

              {/* <label htmlFor={numberId} className={css.label}>
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
              /> */}
              <Field
                type="tel"
                id={numberId}
                name="number"
                label="Number"
                as={TextField}
                variant="outlined"
                fullWidth
                error={touched.name && Boolean(errors.name)}
              ></Field>
              <ErrorMessage
                className={css.errorNumber}
                name="number"
                component="span"
              />
              <div className={css.btnBox}>
                <Button
                  variant="contained"
                  type="button"
                  className={classListCancel}
                  onClick={handleToggleEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  className={classListConfirm}
                  disabled={!isValid || !dirty}
                >
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
