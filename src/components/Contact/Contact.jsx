import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import css from "./Contact.module.css";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useState } from "react";

export default function Contact({ data, handleDelete }) {
  const [modalIsOpen, setModalISOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const handleToggleEdit = (id) => {
    setUserId(id);
    setModalISOpen(!modalIsOpen);
  };

  return (
    <div className={css.card}>
      <ul className={css.cardLis}>
        <li className={css.cardListItem}>
          <p className={css.cardText}>
            <FaUser className={css.icon} size="18px" />
            {data.name}
          </p>
        </li>

        <li className={css.cardListItem}>
          <p className={css.cardText}>
            <FaPhoneAlt className={css.icon} size="18px" />
            {data.number}
          </p>
        </li>
      </ul>
      <button className={css.editBtn} onClick={() => handleToggleEdit(data.id)}>
        <MdEdit size="18px" />
      </button>
      <button className={css.cardBtn} onClick={() => handleDelete(data.id)}>
        Del
      </button>
      {modalIsOpen && (
        <ModalEdit handleToggleEdit={handleToggleEdit} userId={userId} />
      )}
    </div>
  );
}
