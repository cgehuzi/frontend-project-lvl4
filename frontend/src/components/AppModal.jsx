import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { modalActions } from '../slices/modalSlice';
import modals from './modals';

const AppModal = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const type = useSelector((state) => state.modal.type);
  const props = useSelector((state) => state.modal.props);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalActions.closeModal());

  const ModalTypeComponent = modals[type] ?? null;

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      {ModalTypeComponent && <ModalTypeComponent handleClose={handleClose} {...props} />}
    </Modal>
  );
};

export default AppModal;
