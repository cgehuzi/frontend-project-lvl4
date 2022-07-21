import { useDispatch } from 'react-redux';
import { channelsActions } from '../slices/channelsSlice';
import cn from 'classnames';
import { Button, ListGroup } from 'react-bootstrap';
import { modalActions } from '../slices/modalSlice';

const Channel = ({ name, isCurrent, handleClick }) => {
  const channelClasses = cn('px-4', {
    active: isCurrent,
  });
  return (
    <ListGroup.Item action className={channelClasses} onClick={handleClick}>
      <span className="me-2 fw-light">#</span> {name}
    </ListGroup.Item>
  );
};

const ChatAside = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();

  const selectChannel = (channelId) => () => {
    dispatch(channelsActions.setCurrentChannelId(channelId));
  };

  const openModal = () => dispatch(modalActions.openModal({ type: 'newChannel' }));

  return (
    <div className="chat__aside col-12 p-0 bg-dark text-white">
      <div className="chat__aside-header px-4">
        <div className="h5 m-0">Channels</div>
        <Button size="sm" variant="outline-light" onClick={openModal}>
          <span className="px-1 fs-6 lh-1">+</span>
        </Button>
      </div>
      <ListGroup className="chat__aside-body" variant="flush">
        {channels.map(({ id, name }) => {
          return (
            <Channel
              key={id}
              name={name}
              isCurrent={id === currentChannelId}
              handleClick={selectChannel(id)}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

export default ChatAside;
