import { useContext } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';

const AppHeader = () => {
  const { isSignedIn, signOut } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" className="shadow-sm bg-white">
        <div className="container">
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {isSignedIn() && (
            <Button variant="outline-dark" onClick={signOut}>
              Sign out
            </Button>
          )}
        </div>
      </Navbar>
    </>
  );
};
export default AppHeader;
