import { localhost, toQuery } from "../utils/utils";

const addPost = async (post) => {
  const res = await fetch(`${localhost}:3000/posts/create`, {
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify({like:0, share : 0, ...post})
  })
    .then(val => val.json());
  return res;
}

const getPosts = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/posts${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const deletePostById = async (id) => {
  const res = await fetch(`${localhost}:3000/posts/${id}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',  
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const updatePostById = async (id, queries) => {
  const res = await fetch(`${localhost}:3000/posts/${id}`, {
    method : 'PATCH',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(queries)
  })
    .then(val => val.json());
  return res;
}

export {addPost, getPosts, deletePostById, updatePostById}