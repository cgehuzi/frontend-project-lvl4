import { useEffect } from 'react';
import { useRef } from 'react';
import filter from 'leo-profanity';

const Message = ({ username, body }) => {
  const filteredBody = filter.clean(body);

  return (
    <div className="text-break mb-2">
      <strong className="fw-bold">{username}</strong>
      {' : '}
      <span className="text-muted">{filteredBody}</span>
    </div>
  );
};

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  });

  return (
    <div className="chat__main-body px-5 py-3">
      {messages.map(({ id, username, body }) => {
        return <Message key={id} username={username} body={body} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
