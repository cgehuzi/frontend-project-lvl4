import { useEffect } from 'react';
import { useRef } from 'react';
import ChatForm from './ChatForm';

const Message = ({ username, body }) => (
  <div className="chat__message mb-3">
    <div className="chat__message-avatar me-2 bg-dark text-white fw-light">
      {Array.from(username)[0]}
    </div>
    <div className="chat__message-body ps-1">
      <small className="d-block lh-1 fw-bold">{username}</small>
      <small className="d-block text-muted">{body}</small>
    </div>
  </div>
);

const ChatMain = ({ channel, messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  });

  return (
    <div className="chat__main col p-0">
      <div className="chat__main-header px-4 border-bottom bg-white">
        <strong className="h5 m-0 fw-bold"># {channel?.name}</strong>
        <span className="text-muted ms-3">{messages.length} messages</span>
      </div>
      <div className="chat__main-body px-5 py-3">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat__main-footer p-4 bg-white border-top">
        <ChatForm channelId={channel?.id} />
      </div>
    </div>
  );
};
export default ChatMain;
