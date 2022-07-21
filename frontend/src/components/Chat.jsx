import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../contexts/AuthContext';
import { loadData } from '../slices';
import { channelsSelectors } from '../slices/channelsSlice';
import { messagesSelectors } from '../slices/messagesSlice';
import ChatAside from './ChatAside';
import ChatMain from './ChatMain';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) =>
    channelsSelectors.selectById(state, currentChannelId)
  );

  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    dispatch(loadData(user));
  }, []);

  return (
    <div className="chat container my-3 my-md-5 rounded shadow p-0 bg-white">
      <div className="row h-100 m-0">
        <ChatAside channels={channels} currentChannelId={currentChannelId} />
        <ChatMain channel={currentChannel} messages={currentMessages} />
      </div>
    </div>
  );
};

export default Chat;
