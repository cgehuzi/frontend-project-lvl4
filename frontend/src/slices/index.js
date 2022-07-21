import { createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

export const loadData = createAsyncThunk('loadData', async (user) => {
  const response = await axios.get(routes.dataPath(), {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
});

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
