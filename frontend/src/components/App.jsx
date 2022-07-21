import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import Login from './Login';
import NotFound from './NotFoundPage';
import Registration from './Registration';
import AuthProvider from '../contexts/AuthProvider';
import Chat from './Chat';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Provider } from 'react-redux';
import store from '../slices';
import ApiProvider from '../contexts/ApiProvider';
import AppModal from './AppModal';

const LoginRedirect = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate to={routes.loginPagePath()} /> : <Outlet />;
};

const MainRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to={routes.mainPagePath()} /> : <Outlet />;
};

const Main = () => (
  <ApiProvider>
    <Provider store={store}>
      <Chat />
      <AppModal />
    </Provider>
  </ApiProvider>
);

const App = ({ socket }) => {
  return (
    <div className="container-fluid h-100">
      <div className="d-flex flex-column h-100">
        <AuthProvider>
          <Routes>
            <Route path={routes.mainPagePath()} element={<LoginRedirect />}>
              <Route path="" element={<Main />} />
            </Route>
            <Route path={routes.loginPagePath()} element={<MainRedirect />}>
              <Route path="" element={<Login />} />
            </Route>
            <Route path={routes.signupPagePath()} element={<MainRedirect />}>
              <Route path="" element={<Registration />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
