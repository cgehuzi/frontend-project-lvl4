import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ApiContext from '../contexts/ApiContext';
import { channelsSelectors } from '../slices/channelsSlice';

const RenameChannel = ({ handleClose, channelId }) => {
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const { renameChannel } = useContext(ApiContext);
  const nameInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: channel?.name,
    },
    onSubmit: async ({ name }) => {
      setDisabled(true);

      try {
        await renameChannel({ id: channelId, name });
        formik.resetForm();
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setDisabled(false);
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel {channelId}</Modal.Title>
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
              required
            />
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
