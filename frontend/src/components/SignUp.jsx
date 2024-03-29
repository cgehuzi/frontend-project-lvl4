import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SignUp = () => {
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
      confirm: '',
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .trim()
        .min(3, t('validation.userNameMin'))
        .max(20, t('validation.userNameMax'))
        .required(t('validation.required')),
      password: yup
        .string()
        .trim()
        .min(6, t('validation.passwordMin'))
        .required(t('validation.required')),
      confirm: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], t('validation.confirmMatch'))
        .required(t('validation.required')),
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

        if (error.response.status === 409) {
          setInvalid(true);
          setError(t('auth.error409'));
          setTimeout(() => {
            usernameInputRef.current.select();
          });
          return;
        }

        if (error.code === 'ERR_NETWORK') {
          toast.error(t('auth.errorNetwork'));
          return;
        }

        toast.error(t('auth.errorUnknown'));
      }
    },
  });

  return (
    <div className="auth container">
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="h3 text-center mb-4">{t('auth.titleSignUp')}</h1>
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
            <Form.Group className="position-relative mb-3">
              <Form.FloatingLabel controlId="confirm" label={t('auth.confirm')}>
                <Form.Control
                  type="password"
                  placeholder={t('auth.confirm')}
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
              {t('auth.signUp')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            {t('auth.maybeNeedSignIn')} <a href={routes.signInPagePath()}>{t('auth.signIn')}</a>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignUp;
