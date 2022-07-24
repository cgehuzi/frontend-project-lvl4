import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import * as yup from 'yup';

export const getChannelYupSchema = (channels, t) => {
  const channelsNames = channels.map(({ name }) => name);

  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('validation.channelMin'))
      .max(20, t('validation.channelMax'))
      .required(t('validation.required'))
      .notOneOf(channelsNames, t('validation.channelUnique')),
  });
};

const modals = {
  newChannel: NewChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

export default modals;
