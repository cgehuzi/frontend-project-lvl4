import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import LoginPage from './LoginPage';
import NotFound from './NotFoundPage';
import SignupPage from './SignupPage';
import AuthProvider from './AuthProvider';
import ChatPage from './ChatPage';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const LoginRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const MainRedirect = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Outlet /> : <Navigate to={routes.mainPagePath()} />;
};

const App = () => {
  return (
    <div className="container-fluid h-100">
      <AuthProvider>
        <Routes>
          <Route path={routes.mainPagePath()} element={<LoginRedirect />}>
            <Route path="" element={<ChatPage />} />
          </Route>
          <Route path={routes.loginPagePath()} element={<MainRedirect />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path={routes.signupPagePath()} element={<MainRedirect />}>
            <Route path="" element={<SignupPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
