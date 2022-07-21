import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  props: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, ...props } = action.payload;
      state.isOpened = true;
      state.type = type;
      state.props = props ?? {};
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.props = {};
    },
  },
});

const modalReducer = modalSlice.reducer;
export const modalActions = modalSlice.actions;
export default modalReducer;
