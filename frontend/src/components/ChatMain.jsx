import { useEffect } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Message = ({ username, body }) => (
  <div className="chat__message mb-3">
    <small className="chat__message-avatar fw-ligh text-uppercase text-white bg-secondary">
      {Array.from(username)[0]}
    </small>
    <div className="chat__message-body ps-3">
      <small className="d-block lh-1 fw-bold">{username}</small>
      <small className="d-block text-muted">{body}</small>
    </div>
  </div>
);

const ChatMain = ({ channel, messages }) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  });

  return (
    <>
      <div className="chat__main-header px-4 border-bottom bg-white">
        <strong className="h5 m-0 fw-bold text-truncate"># {channel?.name}</strong>
        <span className="text-muted ms-3 text-nowrap">
          {t('messages.counter', { count: messages.length })}
        </span>
      </div>
      <div className="chat__main-body px-5 py-3">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
export default ChatMain;
