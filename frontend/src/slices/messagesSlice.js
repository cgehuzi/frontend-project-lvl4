import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { loadData } from '.';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    });
  },
});

const messagesReducer = messagesSlice.reducer;
export const messagsActions = messagesSlice.actions;
export default messagesReducer;

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
