import React from 'react';
import { POST_TYPE } from '@/types/Post';

const PostList = ({ postList, onFetchPost }: any) => {
  return postList?.map((post: POST_TYPE) => (
    <li key={post.id}>
      <button type='button' onClick={() => onFetchPost(post.id)}>
        <span>{post.title}</span>
        <span>{post.userId}</span>
      </button>
    </li>
  ));
};

export default PostList;
