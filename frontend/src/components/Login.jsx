import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Form, Card, Button, FloatingLabel, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

const Login = () => {
  const { singIn } = useContext(AuthContext);

  const [isInvalid, setInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const invalidFocusInput = useRef(null);

  useEffect(() => {
    invalidFocusInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      setInvalid(false);
      setError(null);
      setDisabled(true);

      try {
        const response = await axios.post(routes.loginPath(), { username, password });
        singIn(response.data);
        setDisabled(false);
      } catch (error) {
        console.error(error);
        setDisabled(false);

        if (!error.isAxiosError) {
          setError('Unknown error');
          return;
        }

        if (error.response.status === 401) {
          setInvalid(true);
          setError('Invalid username or password');
          setTimeout(() => {
            invalidFocusInput.current.select();
          });
          return;
        }

        setError('Network error');
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-5 col-xxl-4">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <Form onSubmit={formik.handleSubmit}>
              <h1 className="h2 text-center mb-4">Log In</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <FloatingLabel className="mb-3" controlId="username" label="User name">
                <Form.Control
                  type="text"
                  placeholder="User name"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  isInvalid={isInvalid}
                  disabled={isDisabled}
                  ref={invalidFocusInput}
                  required
                />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="password" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={isInvalid}
                  disabled={isDisabled}
                  required
                />
              </FloatingLabel>
              <Button className="w-100" variant="primary" type="submit" disabled={isDisabled}>
                Log In
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Don't have an account?</span> <a href="/signup">Registration</a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Login;
