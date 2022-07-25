import { useEffect } from 'react';
import { useRef } from 'react';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <strong className="fw-bold">{username}</strong>
    {' : '}
    <span className="text-muted">{body}</span>
  </div>
);

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  });

  return (
    <div className="chat__main-body px-5 py-3">
      {messages.map(({ id, username, body }) => (
        <Message key={id} username={username} body={body} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
