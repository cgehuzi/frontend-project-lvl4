import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelYupSchema } from '.';
import ApiContext from '../../contexts/ApiContext';
import { channelsSelectors } from '../../slices/channelsSlice';
import { modalActions } from '../../slices/modalSlice';

const RenameChannel = ({ handleClose, channelId }) => {
  const dispatch = useDispatch();
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const { renameChannel } = useContext(ApiContext);
  const nameInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const channels = useSelector(channelsSelectors.selectAll).filter(({ id }) => id !== channelId);
  const validationSchema = getChannelYupSchema(channels);

  const formik = useFormik({
    initialValues: {
      name: channel?.name,
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async ({ name }) => {
      setDisabled(true);

      try {
        await renameChannel({ id: channelId, name });
        dispatch(modalActions.closeModal());
      } catch (error) {
        console.error(error);
        setError(error.message);
        setDisabled(false);
      }
    },
  });

  useEffect(() => {
    nameInputRef.current.select();
  }, []);

  useEffect(() => {
    nameInputRef.current.focus();
  }, [formik.errors.name]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="position-relative" controlId="name">
            <Form.Label>Channel name</Form.Label>
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
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isDisabled}>
            Rename channel
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default RenameChannel;
