import { getI18n, useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Button, ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';

const LangSwitcher = () => {
  const i18n = getI18n();

  const handleClick = (lang) => () => i18n.changeLanguage(lang);

  return (
    <ButtonGroup role="radio" className="me-auto">
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={handleClick('ru')}
        active={i18n.language === 'ru'}
      >
        ru
      </Button>
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={handleClick('en')}
        active={i18n.language === 'en'}
      >
        en
      </Button>
    </ButtonGroup>
  );
};

const AppHeader = () => {
  const { t } = useTranslation();
  const { user, isSignedIn, signOut } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <div className="container">
        <Navbar.Brand className="me-3" href="/">
          {t('app.title')}
        </Navbar.Brand>
        <LangSwitcher />
        {isSignedIn() && (
          <>
            <Navbar.Text className="me-3">{user?.username}</Navbar.Text>
            <Button variant="primary" onClick={signOut}>
              {t('auth.signOut')}
            </Button>
          </>
        )}
      </div>
    </Navbar>
  );
};
export default AppHeader;
