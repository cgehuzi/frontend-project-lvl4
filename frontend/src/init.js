import App from './components/App';
import { io } from 'socket.io-client';
import store from './slices';
import { channelsActions } from './slices/channelsSlice';
import { messagsActions } from './slices/messagesSlice';
import ApiProvider from './contexts/ApiProvider';
import AuthProvider from './contexts/AuthProvider';
import i18next from 'i18next';
import locales from './locales';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';

const initApp = async () => {
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

  // изменения в модуль вносятся глобально
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('fr'));

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources: locales, fallbackLng: 'ru' });

  return (
    <ApiProvider socket={socket}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AuthProvider>
    </ApiProvider>
  );
};

export default initApp;
