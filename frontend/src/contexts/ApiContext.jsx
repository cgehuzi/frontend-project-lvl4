import { createContext } from 'react';
import { io } from 'socket.io-client';
import store from '../slices';
import { channelsActions } from '../slices/channelsSlice';
import { messagsActions } from '../slices/messagesSlice';

const socket = io();

socket.on('newMessage', (payload) => {
  const { id } = payload;
  if (!id) return;
  store.dispatch(messagsActions.newMessage(payload));
});

socket.on('newChannel', (payload) => {
  const { id } = payload;
  if (!id) return;
  store.dispatch(channelsActions.newChannel(payload));
});

socket.on('removeChannel', (payload) => {
  const { id } = payload;
  if (!id) return;
  store.dispatch(channelsActions.removeChannel(payload));
});

socket.on('renameChannel', (payload) => {
  const { id } = payload;
  if (!id) return;
  store.dispatch(channelsActions.renameChannel(payload));
});

export default createContext({
  socket,
  newMessage: () => {},
  newChannel: () => {},
  removeChannel: () => {},
  renameChannel: () => {},
});
