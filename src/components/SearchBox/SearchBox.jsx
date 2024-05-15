import { IoSearch } from "react-icons/io5";
import { useId } from "react";

import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  const inputId = useId();
  return (
    <div className={css.searchBox}>
      <label htmlFor={inputId}>Find contacts by name</label>
      <input
        id={inputId}
        className={css.input}
        type="text"
        value={name}
        onChange={handleChange}
      ></input>
      <IoSearch className={css.searchIcon} size="20px" />
    </div>
  );
}
