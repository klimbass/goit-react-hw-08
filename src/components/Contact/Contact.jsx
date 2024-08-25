import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { MdMail } from "react-icons/md";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useEffect, useState } from "react";

import css from "./Contact.module.css";
import { Tooltip } from "@mui/material";
import ContactType from "../ContactType/ContactType.jsx";

export default function Contact({ data, handleDelete }) {
  
  const [modalIsOpen, setModalISOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const handleToggleEdit = (id) => {
    setUserId(id);
    setModalISOpen(!modalIsOpen);
  };
  

  const [isFavourite, setIsFavourite] = useState(false)
  const handleToggleFav = ()=>{
    console.log(data.isFavourite);
    setIsFavourite(()=>!isFavourite  )
    
  }

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
          <div>
        {data.photo === '' ? <FaUser className={css.icon} size="44px" /> : data.photo} 
        </div>

        <Tooltip title={data.name}>
            <Typography 
                variant="h5" 
                component="div"
                sx={{
                    width: '140px', 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {data.name}
            </Typography>
        </Tooltip>

          <hr className={css.hr} />

          <Typography variant="body3" color="text.secondary">
            <FaPhoneAlt className={css.icon} size="18px" /> {data.phoneNumber}  
          </Typography>
          
          <hr className={css.hr} />

          <Typography variant="body3" color="text.secondary">
            <MdMail  className={css.icon} size="18px" /> {data.email}  
          </Typography>

            <ContactType contactType={data.contactType}></ContactType>  


        </CardContent>
        <CardActions className={css.actions}>
          {/* <div className={css.btnBox}> */}
          <button className={css.favBtn} type="button" onClick={handleToggleFav}>
            {isFavourite ? <MdOutlineFavorite size="22px" fill="#de5d37b3"/> : <MdFavoriteBorder size="22px" />}
          </button>
            <button
              // color="primary"
              onClick={() => handleToggleEdit(data.userId)}
              className={css.editBtn}
            >
              <FiMenu  size='20px'/>
            </button>
            
          {/* </div> */}
        </CardActions>
      </Card>
      {modalIsOpen && (
        <ModalEdit handleToggleEdit={handleToggleEdit} userId={userId} handleDelete={handleDelete} contactId={data._id}/>
      )}
    </div>
  );
}
