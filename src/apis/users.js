import { localhost, toQuery } from "../utils/utils";

const login = async (user) => {
  const res = await getUsers(user);
  if(res.length == 0)
    return null;
  return res[0];
}

const getUsers = async (queries = {}) => {
  const res = await fetch(`${localhost}:3000/users${toQuery(queries)}`, {
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(val => val.json());
  return res;
}

const getUserById = async id => {
  if(!id)
    return null;
  const user = await fetch(`${localhost}:3000/users/${id}`, {
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(val => val.json());
  return Object.keys(user).length ? user : null;
}

const createUser = async (user) => {
  const res = await fetch(`${localhost}:3000/users/create`, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(user),
  })
    .then(val => val.json());
  if(Object.keys(res) == 0)
    return null;
  return res;
}

const updateUserById = async (id, queries = {}) => {
  const res = await fetch(`${localhost}:3000/users/${id}`, {
    method:'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(queries)
  })
    .then(val => val.json());
  return res;
}

export {login, createUser, getUserById, updateUserById};