import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/selectors";

import css from "./ContactList.module.css";

export default function ContactList() {
  const base = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactList}>
      {base.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact data={contact} />
          </li>
        );
      })}
    </ul>
  );
}
