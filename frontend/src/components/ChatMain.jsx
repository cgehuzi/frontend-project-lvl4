import { useEffect } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <strong className="fw-bold">{username}</strong>
    {' : '}
    <span className="text-muted">{body}</span>
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
