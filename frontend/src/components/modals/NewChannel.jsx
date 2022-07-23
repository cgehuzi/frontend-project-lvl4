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

const NewChannel = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { newChannel } = useContext(ApiContext);
  const nameInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const channels = useSelector(channelsSelectors.selectAll);
  const validationSchema = getChannelYupSchema(channels);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
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

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Channel name</Form.Label>
            <Form.Control
              type="text"
              ref={nameInputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={isDisabled}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isDisabled}>
            Add channel
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default NewChannel;
