import ApiContext from './ApiContext';
import { useTranslation } from 'react-i18next';

const ApiProvider = ({ socket, children }) => {
  const { t } = useTranslation();
  const sendSocketEmit = (...args) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(t('api.errorNetwork')));
        return;
      }, 3000);

      socket.emit(...args, (response) => {
        clearTimeout(timer);

        if (response.status === 'ok') {
          resolve(response);
        }

        reject(new Error(t('api.errorServer')));
      });
    });

  const newMessage = (message) => sendSocketEmit('newMessage', message);
  const newChannel = (channel) => sendSocketEmit('newChannel', channel);
  const removeChannel = ({ id }) => sendSocketEmit('removeChannel', { id });
  const renameChannel = ({ id, name }) => sendSocketEmit('renameChannel', { id, name });

  return (
    <ApiContext.Provider
      value={{
        newMessage,
        newChannel,
        removeChannel,
        renameChannel,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
