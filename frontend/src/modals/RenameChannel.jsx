import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../slices/channelsSlice';

const RenameChannel = ({ handleClose, channelId }) => {
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel {channelId}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Channel name</Form.Label>
            <Form.Control type="text" value={channel?.name}></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Rename channel
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default RenameChannel;
