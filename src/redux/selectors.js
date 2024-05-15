import { createSelector } from "@reduxjs/toolkit";

export const selectNameFilter = (state) => state.filters.name;

export const selectContacts = (state) => state.contacts.items;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contactList, filter) => {
    const base = contactList.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLocaleLowerCase());
    });
    return base;
  }
);
