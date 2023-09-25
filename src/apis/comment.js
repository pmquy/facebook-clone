import { localhost, toQuery} from "../utils/utils";

const getComments = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/comments${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const createComment = async comment => {
  const res = await fetch(`${localhost}:3000/comments/create`, {
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(comment)
  })
    .then(val => val.json());
  return res;
}

const deleteCommentById = async id => {
  const res = await fetch(`${localhost}:3000/comments/${id}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

export {getComments, createComment, deleteCommentById};