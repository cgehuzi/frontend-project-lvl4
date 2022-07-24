import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const { t } = useTranslation();
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
      username: yup.string().trim().required(t('auth.yupRequired')),
      password: yup.string().trim().required(t('auth.yupRequired')),
    }),
    onSubmit: async ({ username, password }) => {
      setInvalid(false);
      setError(null);
      setDisabled(true);

      try {
        const response = await axios.post(routes.signInPath(), { username, password });
        signIn(response.data);
        setDisabled(false);
      } catch (error) {
        console.error(error);
        setDisabled(false);

        if (!error.isAxiosError) {
          setError(t('auth.errorUnknown'));
          return;
        }

        if (error.response.status === 401) {
          setInvalid(true);
          setError(t('auth.error401'));
          setTimeout(() => {
            usernameInputRef.current.select();
          });
          return;
        }

        setError(t('auth.errorNetwork'));
      }
    },
  });

  return (
    <div className="auth container">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="h3 text-center mb-4">{t('auth.titleSignIn')}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="position-relative mb-3">
              <Form.FloatingLabel controlId="username" label={t('auth.userName')}>
                <Form.Control
                  type="text"
                  placeholder={t('auth.userName')}
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
              <Form.FloatingLabel controlId="password" label={t('auth.password')}>
                <Form.Control
                  type="password"
                  placeholder={t('auth.password')}
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
            <Button className="w-100" variant="primary" type="submit" disabled={isDisabled}>
              {t('auth.signIn')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            {t('auth.maybeNeedSignUp')} <a href={routes.signUpPagePath()}>{t('auth.signUp')}</a>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignIn;
