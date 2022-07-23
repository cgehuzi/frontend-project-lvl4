import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiContext from '../contexts/ApiContext';
import AuthContext from '../contexts/AuthContext';

const ChatForm = ({ channelId }) => {
  const { user } = useContext(AuthContext);
  const { newMessage } = useContext(ApiContext);
  const messageInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    messageInputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      const apiMessage = { body: message, channelId, username: user?.username };

      setDisabled(true);

      try {
        await newMessage(apiMessage);
        formik.resetForm();
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setDisabled(false);
    },
  });
  return (
    <Form className="chat__form" onSubmit={formik.handleSubmit}>
      <Form.Control
        className="fs-6 me-3"
        size="lg"
        name="message"
        placeholder="Type message ..."
        onChange={formik.handleChange}
        value={formik.values.message}
        disabled={isDisabled}
        ref={messageInputRef}
        required
      />
      <Button
        className="fs-6"
        size="lg"
        variant="primary"
        type="submit"
        disabled={!formik.dirty || formik.isSubmitting}
      >
        Send
      </Button>
    </Form>
  );
};
export default ChatForm;
