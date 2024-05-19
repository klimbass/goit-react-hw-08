import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalIsOpen: false,
    confirm: false,
    contactId: null,
  },
  reducers: {
    setModalOpen: (state, action) => {
      state.modalIsOpen = true;
      state.contactId = action.payload;
    },
    setModalClose: (state, action) => {
      state.modalIsOpen = false;
    },
    setConfirmTrue: (state, action) => {
      state.confirm = true;
    },
    setConfirmFalse: (state, action) => {
      state.confirm = false;
    },
    setContactIdNull: (state, action) => {
      state.contactId = null;
    },
  },
});

export const {
  setModalOpen,
  setModalClose,
  setConfirmTrue,
  setConfirmFalse,
  setContactIdNull,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
