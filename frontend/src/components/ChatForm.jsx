import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiContext from '../contexts/ApiContext';
import AuthContext from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChatForm = ({ channelId }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const { newMessage } = useContext(ApiContext);
  const messageInputRef = useRef(null);

  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    messageInputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      setDisabled(true);

      try {
        await newMessage({
          body,
          channelId,
          username: user?.username,
        });
        formik.resetForm();
        setTimeout(() => {
          messageInputRef.current.focus();
        });
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }

      setDisabled(false);
    },
  });
  return (
    <div className="chat__main-footer p-4 bg-white border-top">
      <Form className="chat__form" onSubmit={formik.handleSubmit}>
        <Form.Control
          className="fs-6 me-3"
          size="lg"
          name="body"
          placeholder={t('messages.typeMessage')}
          onChange={formik.handleChange}
          value={formik.values.body}
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
          {t('messages.sendMessage')}
        </Button>
      </Form>
    </div>
  );
};
export default ChatForm;
