import { useTranslation } from 'react-i18next';

const ChatHeader = ({ channel, messages }) => {
  const { t } = useTranslation();

  return (
    <div className="chat__main-header px-4 border-bottom bg-white">
      <strong className="h5 m-0 fw-bold text-truncate"># {channel?.name}</strong>
      <span className="text-muted ms-3 text-nowrap">
        {t('messages.counter', { count: messages.length })}
      </span>
    </div>
  );
};

export default ChatHeader;
