import ApiContext from './ApiContext';
import { useContext } from 'react';

const ApiProvider = ({ children }) => {
  const { socket } = useContext(ApiContext);

  const sendSocketEmit = (...args) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Some problems with network'));
        return;
      }, 3000);

      socket.emit(...args, (response) => {
        clearTimeout(timer);

        if (response.status === 'ok') {
          resolve(response);
        }

        reject(new Error('Some problems with server'));
      });
    });

  const newMessage = (message) => sendSocketEmit('newMessage', message);
  const newChannel = (channel) => sendSocketEmit('newChannel', channel);
  const removeChannel = (id) => sendSocketEmit('removeChannel', { id });

  return (
    <ApiContext.Provider
      value={{
        newMessage,
        newChannel,
        removeChannel,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
