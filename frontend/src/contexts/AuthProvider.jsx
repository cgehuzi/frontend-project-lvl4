import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate(routes.mainPagePath());
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate(routes.mainPagePath());
  };

  const isSignedIn = () => Boolean(user);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
