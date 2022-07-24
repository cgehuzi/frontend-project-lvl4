import App from './components/App';
import { io } from 'socket.io-client';
import store from './slices';
import { channelsActions } from './slices/channelsSlice';
import { messagsActions } from './slices/messagesSlice';
import ApiProvider from './contexts/ApiProvider';
import AuthProvider from './contexts/AuthProvider';

const initApp = () => {
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

  return (
    <ApiProvider socket={socket}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  );
};

export default initApp;
