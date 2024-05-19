import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/filters/selectors";

import css from "./ContactList.module.css";
import {
  selectContactId,
  selectModalConfirm,
} from "../../redux/modal/selectors";
import {
  setConfirmFalse,
  setContactIdNull,
  setModalOpen,
} from "../../redux/modal/slice";
import { useEffect } from "react";
import { deleteContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

export default function ContactList() {
  const base = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();
  let confirm = useSelector(selectModalConfirm);
  const contactId = useSelector(selectContactId);

  const handleDelete = (id) => {
    dispatch(setModalOpen(id));
  };
  useEffect(() => {
    if (confirm) {
      dispatch(deleteContact(contactId));

      toast.success("Deleted successful!");
      dispatch(setContactIdNull());
    }
    dispatch(setConfirmFalse());
  }, [confirm, contactId, dispatch]);

  return (
    <ul className={css.contactList}>
      <Toaster />
      {base.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact data={contact} handleDelete={handleDelete} />
          </li>
        );
      })}
    </ul>
  );
}
