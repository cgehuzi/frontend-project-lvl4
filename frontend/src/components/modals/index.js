import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import * as yup from 'yup';

export const getChannelYupSchema = (channels) => {
  const channelsNames = channels.map(({ name }) => name);

  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'Minimum 3 letters')
      .max(20, 'Maximum 20 letters')
      .required('Required field')
      .notOneOf(channelsNames, 'Channel name must be unique'),
  });
};

const modals = {
  newChannel: NewChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

export default modals;
