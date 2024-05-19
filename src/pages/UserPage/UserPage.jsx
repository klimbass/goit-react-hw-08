import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserPage.module.css";
import { IoLogoOctocat } from "react-icons/io5";
import { selectContacts } from "../../redux/contacts/selectors";

export default function UserPage() {
  const user = useSelector(selectUser);
  const contacts = useSelector(selectContacts);
  return (
    <div className={css.userCard}>
      <IoLogoOctocat
        size="88px"
        color="rgba(48, 111, 170, 0.278)"
        className={css.image}
      />
      <img src="" alt="" />
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Contacts: {contacts.length}</p>
      </div>
    </div>
  );
}
