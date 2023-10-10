import {localhost, toQuery} from '../utils/utils'

const getUserLikePost = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/userlikepost${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  if(Object.keys(res).length)
    return res;
  return null;
}

const createUserLikePost = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/userlikepost/create`, {
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(queries)
  })
    .then(val => val.json());
  return res;
}

const deleteUserLikePost = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/userlikepost${toQuery(queries)}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

export {getUserLikePost, deleteUserLikePost, createUserLikePost}