import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { POST_TYPE } from '@/types/Post';
import style from './PostList.module.css';
import Modal from './Portal/Modal';
import {
  deletePostDetail,
  getPostDetail,
  getPostList,
  modifyPostDetail,
} from '@/apis/crud';

export default function PostList() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [post, setPost] = useState<POST_TYPE | null>(null);
  const [state, setState] = useState<any>(null);

  const { data: postList, refetch: refetchPost } = useQuery(
    ['postList'],
    getPostList
  );

  const handleClickPost = (id: number) => {
    const fetchPostDetail = async (id: number) => {
      const postDetail = await getPostDetail(id);
      setPost(postDetail);
      setOpenModal(true);
    };

    fetchPostDetail(id);
  };

  const resetState = async () => {
    await refetchPost();
    setState(null);
    setOpenModal(false);
  };

  const handleDeletePost = async () => {
    if (post) {
      setState('deleting');
      await deletePostDetail(post.id);
      resetState();
    }
  };

  const handleModifyPost = async (data: POST_TYPE) => {
    if (post) {
      setState('saving');
      await modifyPostDetail(post.id, data);
      resetState();
    }
  };

  return (
    <div className={style.style}>
      <h2>Post List</h2>
      <ul>
        <li>
          <span>Title</span>
          <span>Writer</span>
        </li>
        {postList?.map((post: POST_TYPE) => (
          <li key={post.id}>
            <button type='button' onClick={() => handleClickPost(post.id)}>
              <span>{post.title}</span>
              <span>{post.userId}</span>
            </button>
          </li>
        ))}
      </ul>
      {openModal && post && (
        <Modal
          post={post}
          onDelete={handleDeletePost}
          onEdit={handleModifyPost}
          setOpenModal={setOpenModal}
          state={state}
        />
      )}
    </div>
  );
}
