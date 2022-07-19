import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
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

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
