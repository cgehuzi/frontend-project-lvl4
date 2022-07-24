import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../contexts/AuthContext';
import { loadData } from '../slices';
import { channelsSelectors } from '../slices/channelsSlice';
import { messagesSelectors } from '../slices/messagesSlice';
import ChatAside from './ChatAside';
import ChatForm from './ChatForm';
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
    <div className="chat container rounded shadow p-0 bg-white">
      <ChatAside channels={channels} currentChannelId={currentChannelId} />
      <div className="chat__main">
        <ChatMain channel={currentChannel} messages={currentMessages} />
        <ChatForm channelId={currentChannelId} />
      </div>
    </div>
  );
};

export default Chat;
