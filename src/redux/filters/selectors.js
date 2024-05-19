import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contactList, filter) => {
    const base = contactList.filter((item) => {
      return (
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter)
      );
    });

    return base;
  }
);
