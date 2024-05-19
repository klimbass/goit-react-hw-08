import { BiRadar } from "react-icons/bi";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.box}>
      <BiRadar size="80px" className={css.radar} />
      <div>
        <h2 className={css.error}>404</h2>
        <p>Sorry, we couldn`t find this page...</p>
      </div>
    </div>
  );
}
