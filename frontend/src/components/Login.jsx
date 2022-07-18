import { useFormik } from 'formik';
import { Form, Card, Button, FloatingLabel } from 'react-bootstrap';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-5 col-xxl-4">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <Form onSubmit={formik.handleSubmit}>
              <h1 className="h2 text-center mb-4">Log In</h1>
              <FloatingLabel className="mb-3" controlId="username" label="User name">
                <Form.Control
                  type="text"
                  placeholder="User name"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="password" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FloatingLabel>
              <Button className="w-100" variant="primary" type="submit">
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
