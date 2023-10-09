import { POST_TYPE } from '@/types/Post';

const postListUrl = 'https://jsonplaceholder.typicode.com/posts';
const postDetailUrl = (id: number) => `${postListUrl}/${id}`;

const serverUrl = 'http://localhost:8000/postList';
const serverDetailUrl = (id: string) => `${serverUrl}/${id}`;

export const getPostList = () => {
  return fetch(serverUrl).then((res) => res.json());
};

export const getPostDetail = (id: number) => {
  return fetch(serverDetailUrl(id.toString())).then((res) => res.json());
};

export const deletePostDetail = (id: number) => {
  return fetch(serverDetailUrl(id.toString()), {
    method: 'DELETE',
  });
};

export const modifyPostDetail = (id: number, data: POST_TYPE) => {
  return fetch(serverDetailUrl(id.toString()), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};
