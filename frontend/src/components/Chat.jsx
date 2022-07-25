import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../contexts/AuthContext';
import { loadData } from '../slices';
import { channelsSelectors } from '../slices/channelsSlice';
import { messagesSelectors } from '../slices/messagesSlice';
import AppModal from './AppModal';
import ChatAside from './ChatAside';
import ChatForm from './ChatForm';
import ChatMain from './ChatMain';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Chat = () => {
  const { t } = useTranslation();
  const { user, signOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) =>
    channelsSelectors.selectById(state, currentChannelId)
  );

  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(
    () => async () => {
      setLoading(true);

      try {
        await dispatch(loadData(user)).unwrap();
        setLoading(false);
      } catch (error) {
        console.error(error);

        if (
          error.response?.status === 401 ||
          error.message === 'Request failed with status code 401'
        ) {
          signOut();
          return;
        }

        if (error.code === 'ERR_NETWORK') {
          toast.error(t('app.errorNetwork'));
          return;
        }

        toast.error(t('app.errorUnknown'));
      }
    },
    []
  );

  return loading ? (
    <div className="loader">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('app.loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <div className="chat container rounded shadow p-0 bg-white">
        <ChatAside channels={channels} currentChannelId={currentChannelId} />
        <div className="chat__main">
          <ChatMain channel={currentChannel} messages={currentMessages} />
          <ChatForm channelId={currentChannelId} />
        </div>
      </div>
      <AppModal />
    </>
  );
};

export default Chat;
