import { Link, NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

export default function AuthNav() {
  const classList = ({ isActive }) => clsx(css.login, isActive && css.active);
  return (
    <div className={css.authNav}>
      {/* <Link to="/register">Registration</Link> */}
      <NavLink className={classList} to="/login">
        Log in
      </NavLink>
    </div>
  );
}
