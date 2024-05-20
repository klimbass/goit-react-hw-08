import { IoSearch } from "react-icons/io5";

import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import { InputAdornment, TextField } from "@mui/material";

export default function SearchBox() {
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <TextField
        className={css.input}
        variant="outlined"
        fullWidth
        placeholder="Find contacts"
        onChange={handleChange}
        type="text"
        value={name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IoSearch size="20px" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
