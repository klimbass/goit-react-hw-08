import clsx from "clsx";
import css from "./ModalEdit.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useId, useState } from "react";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";
import { editContact } from "../../redux/contacts/operations";

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

  //   const handleChange = (event) => {
  //     console.log(event.target.value);
  //     // setValue(event.target.value);
  //   };

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
  };
  const initialValues = {
    name: contact.name || "",
    number: contact.number || "",
  };

  return (
    <div className={css.modalBox}>
      <div className={css.modal}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ContactSchema}
          enableReinitialize
        >
          {({ errors, isValid, dirty }) => (
            <Form className={css.form}>
              <p className={css.title}>Edit contact:</p>
              <label htmlFor={nameId} className={css.label}>
                {errors.name ? (
                  <GoCheckCircle className={css.check} />
                ) : (
                  <GoCheckCircleFill className={css.check} />
                )}
              </label>
              <Field
                className={css.input}
                id={nameId}
                name="name"
                // value={contact.name}
                // onChange={handleChange}
                // placeholder="hola"
              ></Field>
              <ErrorMessage
                className={css.errorName}
                name="name"
                component="span"
              />
              <label htmlFor={numberId} className={css.label}>
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
              <div>
                <button
                  type="button"
                  className={classListCancel}
                  onClick={handleToggleEdit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={classListConfirm}
                  disabled={!isValid || !dirty}
                >
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
