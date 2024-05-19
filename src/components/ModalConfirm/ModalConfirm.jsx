import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmTrue, setModalClose } from "../../redux/modal/slice";
import css from "./ModalConfirm.module.css";
import { selectModalIsOpen } from "../../redux/modal/selectors";
import { useEffect } from "react";

export default function ModalConfirm() {
  const dispatch = useDispatch();
  const classListCancel = clsx(css.btn, css.btnCancel);
  const classListConfirm = clsx(css.btn, css.btnConfirm);
  const handleClickCancel = () => {
    dispatch(setModalClose());
  };
  const modalIsOpen = useSelector(selectModalIsOpen);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

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
