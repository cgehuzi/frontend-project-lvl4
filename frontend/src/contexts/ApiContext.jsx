import { createContext } from 'react';

export default createContext({
  newMessage: () => {},
  getChannelYupSchema: () => {},
  newChannel: () => {},
  removeChannel: () => {},
  renameChannel: () => {},
});
