import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import SignIn from './SignIn';
import NotFound from './NotFoundPage';
import SignUp from './SignUp';
import Chat from './Chat';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Provider } from 'react-redux';
import store from '../slices';
import AppModal from './AppModal';
import AppHeader from './AppHeader';

const SignInRedirect = () => {
  const { isSignedIn } = useContext(AuthContext);
  return !isSignedIn() ? <Navigate to={routes.signInPagePath()} /> : <Outlet />;
};

const MainRedirect = () => {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn() ? <Navigate to={routes.mainPagePath()} /> : <Outlet />;
};

const Main = () => (
  <Provider store={store}>
    <Chat />
    <AppModal />
  </Provider>
);

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <div className="app__body">
        <div className="container-fluid py-3 py-md-5 overflow-auto h-100">
          <Routes>
            <Route path={routes.mainPagePath()} element={<SignInRedirect />}>
              <Route path="" element={<Main />} />
            </Route>
            <Route path={routes.signInPagePath()} element={<MainRedirect />}>
              <Route path="" element={<SignIn />} />
            </Route>
            <Route path={routes.signUpPagePath()} element={<MainRedirect />}>
              <Route path="" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
