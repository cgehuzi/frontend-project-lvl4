import ApiContext from './ApiContext';
import { useContext } from 'react';
import * as yup from 'yup';

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

  const getChannelYupSchema = (channels) => {
    const channelsNames = channels.map(({ name }) => name);

    return yup.object().shape({
      name: yup
        .string()
        .trim()
        .min(3, 'Minimum 3 letters')
        .max(20, 'Maximum 20 letters')
        .required('Required field')
        .notOneOf(channelsNames, 'Channel name must be unique'),
    });
  };

  const newMessage = (message) => sendSocketEmit('newMessage', message);
  const newChannel = (channel) => sendSocketEmit('newChannel', channel);
  const removeChannel = ({ id }) => sendSocketEmit('removeChannel', { id });
  const renameChannel = ({ id, name }) => sendSocketEmit('renameChannel', { id, name });

  return (
    <ApiContext.Provider
      value={{
        newMessage,
        getChannelYupSchema,
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
