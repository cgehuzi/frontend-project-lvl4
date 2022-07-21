import { Button, Modal } from 'react-bootstrap';

const RemoveChannel = ({ handleClose, channelId }) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Remove Channel {channelId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0">Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">Remove channel</Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannel;
