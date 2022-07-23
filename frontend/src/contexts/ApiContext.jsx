import { createContext } from 'react';
import { io } from 'socket.io-client';
import store from '../slices';
import { channelsActions } from '../slices/channelsSlice';
import { messagsActions } from '../slices/messagesSlice';

const socket = io();

socket.on('newMessage', (payload) => {
  const { body, channelId, username } = payload;
  if (!body || !channelId || !username) return;
  store.dispatch(messagsActions.newMessage(payload));
});

socket.on('newChannel', (payload) => {
  const { name, removable } = payload;
  if (!name || !removable) return;
  store.dispatch(channelsActions.newChannel(payload));
});

export default createContext({
  socket,
  newMessage: () => {},
  newChannel: () => {},
});
