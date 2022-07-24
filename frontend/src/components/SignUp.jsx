import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import * as yup from 'yup';

const SignUp = () => {
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
      confirm: '',
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .trim()
        .min(3, 'Length from 3 to 20 characters')
        .max(20, 'Length from 3 to 20 characters')
        .required('Required field'),
      password: yup.string().trim().min(6, 'Minimum 6 characters').required('Required field'),
      confirm: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Required field'),
    }),
    onSubmit: async ({ username, password }) => {
      setInvalid(false);
      setError(null);
      setDisabled(true);

      try {
        const response = await axios.post(routes.signUpPath(), { username, password });
        signIn(response.data);
        setDisabled(false);
      } catch (error) {
        console.error(error);
        setDisabled(false);

        if (!error.isAxiosError) {
          setError('Unknown error');
          return;
        }

        if (error.response.status === 409) {
          setInvalid(true);
          setError('User already exists');
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
    <div className="auth container">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="h3 text-center mb-4">Sign up</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="position-relative mb-3">
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
                {formik.errors.username && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                )}
              </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className="position-relative mb-3">
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
                {formik.errors.password && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className="position-relative mb-3">
              <Form.FloatingLabel controlId="confirm" label="Confirm password">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirm}
                  isInvalid={isInvalid || (formik.touched.confirm && formik.errors.confirm)}
                  disabled={isDisabled}
                  required
                />
                {formik.errors.confirm && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirm}
                  </Form.Control.Feedback>
                )}
              </Form.FloatingLabel>
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit" disabled={isDisabled}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            <span>Already have an profile?</span> <a href={routes.signInPagePath()}>Sign in</a>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignUp;
