import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useEffect, useState } from "react";

import css from "./Contact.module.css";

export default function Contact({ data, handleDelete }) {
  const [modalIsOpen, setModalISOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const handleToggleEdit = (id) => {
    setUserId(id);
    setModalISOpen(!modalIsOpen);
  };

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

  return (
    <div>
      <Card className={css.card}>
        <CardContent>
          <Typography variant="h5" component="div">
            <FaUser className={css.icon} size="18px" /> {data.name}
          </Typography>
          <hr className={css.hr} />
          <Typography variant="body3" color="text.secondary">
            <FaPhoneAlt className={css.icon} size="18px" /> {data.number}
          </Typography>
        </CardContent>
        <CardActions className={css.actions}>
          <div className={css.btnBox}>
            <Button
              color="primary"
              onClick={() => handleToggleEdit(data.id)}
              className={css.editBtn}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              onClick={() => handleDelete(data.id)}
              className={css.cardBtn}
            >
              Del
            </Button>
          </div>
        </CardActions>
      </Card>
      {modalIsOpen && (
        <ModalEdit handleToggleEdit={handleToggleEdit} userId={userId} />
      )}
    </div>
  );
}
