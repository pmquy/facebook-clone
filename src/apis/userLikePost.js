import {localhost, toQuery} from '../utils/utils'

const getUserLikePost = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/userlikeposts${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  }) 
    .then(val => val.json());
  return res;
}

const createUserLikePost = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/userlikeposts/create`, {
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
  const res = await fetch(`${localhost}:3000/userlikeposts${toQuery(queries)}`, {
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