import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { loadData } from '.';
import { channelsActions } from './channelsSlice';
import _ from 'lodash';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const message = action.payload;
      messagesAdapter.addOne(state, message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id: channelId } = action.payload;
        const removedIds = state.ids.filter((id) => {
          const message = state.entities[id];
          return message.channelId === channelId;
        });
        messagesAdapter.removeMany(state, removedIds);
      });
  },
});

const messagesReducer = messagesSlice.reducer;
export const messagsActions = messagesSlice.actions;
export default messagesReducer;

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
