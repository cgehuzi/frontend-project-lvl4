import { useDispatch } from 'react-redux';
import { channelsActions } from '../slices/channelsSlice';
import { Button, Dropdown, ListGroup } from 'react-bootstrap';
import { modalActions } from '../slices/modalSlice';

const Channel = ({ id, name, removable, isCurrent }) => {
  const dispatch = useDispatch();

  const selectChannel = () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  const openRemoveChannelModal = () => {
    dispatch(modalActions.openModal({ type: 'removeChannel', channelId: id }));
  };

  const openRenameChannelModal = () => {
    dispatch(modalActions.openModal({ type: 'renameChannel', channelId: id }));
  };

  if (removable) {
    return (
      <div>
        <Dropdown as={ListGroup.Item} className="p-0 d-flex" active={isCurrent}>
          <ListGroup.Item className="px-4" action onClick={selectChannel} active={isCurrent}>
            <span className="me-2 fw-light">#</span> {name}
          </ListGroup.Item>

          <Dropdown.Toggle className="m-1 py-0" variant={isCurrent ? 'primary' : 'dark'} split />

          <Dropdown.Menu>
            <Dropdown.Item onClick={openRemoveChannelModal}>Remove channel</Dropdown.Item>
            <Dropdown.Item onClick={openRenameChannelModal}>Rename channel</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <ListGroup.Item className="px-4" action onClick={selectChannel} active={isCurrent}>
      <span className="me-2 fw-light">#</span> {name}
    </ListGroup.Item>
  );
};

const ChatAside = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();

  const openNewChannelModal = () => dispatch(modalActions.openModal({ type: 'newChannel' }));

  return (
    <div className="chat__aside col-12 p-0 bg-dark text-white">
      <div className="chat__aside-header px-4">
        <div className="h5 m-0">Channels</div>
        <Button size="sm" variant="outline-light" onClick={openNewChannelModal}>
          <span className="px-1 fs-6 lh-1">+</span>
        </Button>
      </div>
      <ListGroup className="chat__aside-body" variant="flush">
        {channels.map(({ id, name, removable }) => {
          return (
            <Channel
              key={id}
              id={id}
              name={name}
              removable={removable}
              isCurrent={id === currentChannelId}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

export default ChatAside;
