import clsx from "clsx";
import css from "./ModalConfirm.module.css";
import { useDispatch } from "react-redux";
import { setConfirmTrue, setModalClose } from "../../redux/modal/slice";

export default function ModalConfirm() {
  const dispatch = useDispatch();
  const classListCancel = clsx(css.btn, css.btnCancel);
  const classListConfirm = clsx(css.btn, css.btnConfirm);
  const handleClickCancel = () => {
    dispatch(setModalClose());
  };

  const handleClickConfirm = () => {
    dispatch(setConfirmTrue());
    dispatch(setModalClose());
  };

  return (
    <div className={css.modalBox}>
      <div className={css.modal}>
        <p>Are you shure?</p>
        <button className={classListCancel} onClick={handleClickCancel}>
          Cancel
        </button>
        <button className={classListConfirm} onClick={handleClickConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
