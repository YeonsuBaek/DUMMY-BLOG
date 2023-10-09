import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react';
import PostList from '@/components/PostList';
import { POST_TYPE } from '@/types/Post';
import style from './Blog.module.css';
import Modal from './Portal/Modal';
import {
  deletePostDetail,
  getPostDetail,
  getPostList,
  modifyPostDetail,
} from '@/apis/crud';
import { BiSearch } from 'react-icons/bi';

export default function Blog() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [post, setPost] = useState<POST_TYPE | null>(null);
  const [state, setState] = useState<any>(null);

  const { data: postList, refetch: refetchPost } = useQuery(
    ['postList'],
    getPostList
  );

  const handleFetchPost = (id: number) => {
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
      <div>
        <input type='text' placeholder='Type something...' />
        <button type='button'>
          <BiSearch size='24' />
        </button>
      </div>
      <ul>
        <li>
          <span>Title</span>
          <span>Writer</span>
        </li>
        <PostList postList={postList} onFetchPost={handleFetchPost} />
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
