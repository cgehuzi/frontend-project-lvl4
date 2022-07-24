import { createContext } from 'react';

export default createContext({
  newMessage: () => {},
  newChannel: () => {},
  removeChannel: () => {},
  renameChannel: () => {},
});
