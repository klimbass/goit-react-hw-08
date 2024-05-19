import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className={css.userMenu}>
      <p className={css.userTitle}>
        Hello,
        <Link className={css.link} to="/userpage">
          {" "}
          {user.name}
        </Link>
      </p>
      <button className={css.button} type="button" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
}
