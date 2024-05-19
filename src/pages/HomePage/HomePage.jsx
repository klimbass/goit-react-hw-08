import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { MdOutlineContactPhone } from "react-icons/md";
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);

  return (
    <div className={css.homePage}>
      {isLoggedIn ? (
        <Link to="/contact">
          <MdOutlineContactPhone
            size="88px"
            color="rgba(48, 111, 170, 0.712)"
            className={css.image}
          />
        </Link>
      ) : (
        <Link to="/login">
          <MdOutlineContactPhone
            size="88px"
            color="rgba(48, 111, 170, 0.712)"
            className={css.image}
          />
        </Link>
      )}
    </div>
  );
}
