import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getChannelYupSchema } from '.';
import ApiContext from '../../contexts/ApiContext';
import { channelsActions, channelsSelectors } from '../../slices/channelsSlice';
import { modalActions } from '../../slices/modalSlice';
import { useTranslation } from 'react-i18next';

const NewChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { newChannel } = useContext(ApiContext);
  const nameInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const channels = useSelector(channelsSelectors.selectAll);
  const validationSchema = getChannelYupSchema(channels, t);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async ({ name }) => {
      setDisabled(true);

      try {
        const response = await newChannel({ name });
        const { id } = response.data;

        batch(() => {
          dispatch(channelsActions.setCurrentChannelId(id));
          dispatch(modalActions.closeModal());
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
        setDisabled(false);
      }
    },
  });

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  useEffect(() => {
    nameInputRef.current.focus();
  }, [formik.errors.name]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titleNewChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="position-relative" controlId="name">
            <Form.Label>{t('modals.channelName')}</Form.Label>
            <Form.Control
              type="text"
              ref={nameInputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={isDisabled}
              isInvalid={formik.errors.name && formik.touched.name}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={isDisabled}>
            {t('modals.addChannel')}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default NewChannel;
