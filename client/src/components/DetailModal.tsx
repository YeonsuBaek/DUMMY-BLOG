import { DetailModalProps } from '@/types/PostDetailModal';
import React, { ChangeEvent, useState } from 'react';
import style from './DetailModal.module.css';

function DetailModal({
  post,
  setOpenModal,
  onDelete,
  onEdit,
  state,
}: DetailModalProps) {
  const [editVer, setEditVer] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);

  const handleClickDeleteButton = () => {
    if (editVer) {
      setEditVer(false);
    } else {
      onDelete();
    }
  };

  const handleClickEditButton = async () => {
    if (editVer) {
      const data = {
        id: post.id,
        title,
        body,
        userId: post.userId,
      };
      onEdit(data);
    } else {
      setEditVer(!editVer);
    }
  };

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: any
  ) => {
    const { value } = e.target;
    switch (type) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        break;
    }
  };

  return (
    <aside className={style.style}>
      <h3>
        {editVer ? (
          <input
            type='text'
            value={title}
            onChange={(e) => handleChangeValue(e, 'title')}
          />
        ) : (
          post.title
        )}
      </h3>
      <p>
        {editVer ? (
          <textarea
            value={body}
            onChange={(e) => handleChangeValue(e, 'body')}
          />
        ) : (
          post.body
        )}
      </p>
      <footer>
        <button
          type='button'
          onClick={handleClickDeleteButton}
          disabled={state === 'deleting'}
        >
          {editVer ? 'Cancel' : 'Delete'}
        </button>
        <button
          type='button'
          onClick={handleClickEditButton}
          disabled={state === 'saving'}
        >
          {editVer ? 'Save' : 'Edit'}
        </button>
        <button type='button' onClick={() => setOpenModal(false)}>
          Close
        </button>
      </footer>
    </aside>
  );
}

export default DetailModal;
