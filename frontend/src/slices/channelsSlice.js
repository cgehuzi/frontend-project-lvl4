import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { loadData } from '.';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    newChannel: (state, action) => {
      const channel = action.payload;
      channelsAdapter.addOne(state, channel);
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      channelsAdapter.removeOne(state, id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

const channelsReducer = channelsSlice.reducer;
export const channelsActions = channelsSlice.actions;
export default channelsReducer;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
