import { POST_TYPE } from './Post';
import { STATE_TYPE } from './State';

export type DetailModalProps = {
  post: POST_TYPE;
  setOpenModal: (isOpen: boolean) => void;
  onDelete: () => void;
  onEdit: (data: POST_TYPE) => void;
  state: STATE_TYPE;
};
