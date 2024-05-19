import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserPage.module.css";
import { IoLogoOctocat } from "react-icons/io5";

export default function UserPage() {
  const user = useSelector(selectUser);
  return (
    <div className={css.userCard}>
      <IoLogoOctocat
        size="88px"
        color="rgba(48, 111, 170, 0.278)"
        className={css.image}
      />
      <img src="" alt="" />
      <div>
        <p>Name:{user.name}</p>
        <p>Email:{user.email}</p>
      </div>
    </div>
  );
}
