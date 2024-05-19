import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  const classList = ({ isActive }) => clsx(css.login, isActive && css.active);
  return (
    <div className={css.authNav}>
      <NavLink className={classList} to="/login">
        Log in
      </NavLink>
    </div>
  );
}
