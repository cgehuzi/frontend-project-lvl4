import { useContext, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channelsSlice';
import ApiContext from '../../contexts/ApiContext';
import { modalActions } from '../../slices/modalSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ handleClose, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channel = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const { removeChannel } = useContext(ApiContext);
  const removeButtonRef = useRef(null);

  const [error, setError] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    removeButtonRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    setDisabled(true);

    try {
      await removeChannel({ id: channelId });
      dispatch(modalActions.closeModal());
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

    setDisabled(false);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titleRemoveChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0">{t('modals.channelWillRemoved', { name: channel?.name })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" ref={removeButtonRef} onClick={handleSubmit} disabled={isDisabled}>
          {t('modals.removeChannel')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannel;
