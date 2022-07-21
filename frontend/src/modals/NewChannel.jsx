import { Button, Form, Modal } from 'react-bootstrap';

const NewChannel = ({ handleClose }) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Channel</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Channel name</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add channel
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default NewChannel;
