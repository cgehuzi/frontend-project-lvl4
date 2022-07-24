import { createContext } from 'react';

export default createContext({
  user: {},
  signIn: () => {},
  signOut: () => {},
  isSignedIn: () => {},
});
