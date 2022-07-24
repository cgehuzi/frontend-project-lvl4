import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';

const AppHeader = () => {
  const { t } = useTranslation();
  const { isSignedIn, signOut } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" className="shadow-sm bg-white">
        <div className="container">
          <Navbar.Brand href="/">{t('app.title')}</Navbar.Brand>
          {isSignedIn() && (
            <Button variant="outline-dark" onClick={signOut}>
              {t('auth.signOut')}
            </Button>
          )}
        </div>
      </Navbar>
    </>
  );
};
export default AppHeader;
