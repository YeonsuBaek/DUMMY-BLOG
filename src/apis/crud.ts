export const postListUrl = 'https://jsonplaceholder.typicode.com/posts';
const postDetailUrl = (id: number) => `${postListUrl}/${id}`;

export const getPostList = () => {
  return fetch(postListUrl).then((res) => res.json());
};

export const getPostDetail = (id: number) => {
  return fetch(postDetailUrl(id)).then((res) => res.json());
};

export const deletePostDetail = (id: number) => {
  return fetch(postDetailUrl(id), {
    method: 'DELETE',
  });
};

export const modifyPostDetail = (id: number, data: any) => {
  return fetch(postDetailUrl(id), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};
