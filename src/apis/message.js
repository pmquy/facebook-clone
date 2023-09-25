import {localhost, toQuery} from '../utils/utils'

const getMessages = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/messages${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const createMessage = async message => {
  const res = await fetch(`${localhost}:3000/messages/create`, {
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(message)
  })
    .then(val => val.json());
  return res;
}

const deleteMessageById = async id => {
  const res = await fetch(`${location}:3000/messages/${id}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

export {getMessages, createMessage, deleteMessageById};