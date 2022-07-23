import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import * as yup from 'yup';
import cn from 'classnames';

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [isInvalid, setInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async ({ username, password }) => {
      setInvalid(false);
      setError(null);
      setDisabled(true);

      try {
        const response = await axios.post(routes.loginPath(), { username, password });
        signIn(response.data);
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
            usernameInputRef.current.select();
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
              <Form.Group className="mb-3">
                <Form.FloatingLabel controlId="username" label="User name">
                  <Form.Control
                    type="text"
                    placeholder="User name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={isInvalid || (formik.touched.username && formik.errors.username)}
                    disabled={isDisabled}
                    ref={usernameInputRef}
                    required
                  />
                </Form.FloatingLabel>
                <Form.Control.Feedback
                  type="invalid"
                  className={cn({ 'd-block': formik.touched.username && formik.errors.username })}
                >
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.FloatingLabel controlId="password" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={isInvalid || (formik.touched.password && formik.errors.password)}
                    disabled={isDisabled}
                    required
                  />
                </Form.FloatingLabel>
                <Form.Control.Feedback
                  type="invalid"
                  className={cn({ 'd-block': formik.touched.password && formik.errors.password })}
                >
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
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
