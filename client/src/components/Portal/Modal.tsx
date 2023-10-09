import ReactDom from 'react-dom';
import DetailModal from '../DetailModal';
import { DetailModalProps } from '@/types/PostDetailModal';
import Backdrop from '../Backdrop';

const Modal = ({
  post,
  setOpenModal,
  onDelete,
  onEdit,
  state,
}: DetailModalProps) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDom.createPortal(
        <DetailModal
          post={post}
          setOpenModal={setOpenModal}
          onDelete={onDelete}
          onEdit={onEdit}
          state={state}
        />,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
