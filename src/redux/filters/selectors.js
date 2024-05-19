import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contactList, filter) => {
    const filterNum = filter.replace(/\D/g, "");
    // const base = contactList.filter((item) => {
    //   if (!isNaN(filterNum) && filterNum.trim() !== "") {
    //     return item.number.replace(/\D/g, "").includes(filterNum);
    //   }
    //   return item.name.toLowerCase().includes(filter.toLocaleLowerCase());
    // });
    console.log(filter);
    const base = contactList.filter((item) => {
      return (
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter)
      );
    });

    return base;
  }
);
