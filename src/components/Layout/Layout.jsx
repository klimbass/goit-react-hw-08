import { useSelector } from "react-redux";
import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import css from "./Layout.module.css";
import { selectModalIsOpen } from "../../redux/modal/selectors";

export default function Layout({ children }) {
  const modalIsOpen = useSelector(selectModalIsOpen);
  return (
    <div className={css.layout}>
      <div>
        <AppBar />

        <div className={css.appBox}>
          <div className={css.titleBox}>
            <h1 className={css.appTitle}>Phonebook</h1>
          </div>
        </div>
      </div>
      <div className={css.children}>{children}</div>
      <Footer />
      {modalIsOpen && <ModalConfirm />}
    </div>
  );
}
