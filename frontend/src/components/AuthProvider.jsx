import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logIn = (authUser) => {
    localStorage.setItem('user', JSON.stringify(authUser));
    setUser(authUser);
    navigate(routes.mainPagePath());
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate(routes.mainPagePath());
  };

  return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
