import { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../slices/channelsSlice';
import ApiContext from '../contexts/ApiContext';

const RemoveChannel = ({ handleClose, channelId }) => {
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const { removeChannel } = useContext(ApiContext);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);

    try {
      await removeChannel({ id: channelId });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

    setDisabled(false);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0">
          Channel <strong>"{channel?.name}"</strong> will be removed. Are you sure?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit} disabled={isDisabled}>
          Yes, remove
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannel;
