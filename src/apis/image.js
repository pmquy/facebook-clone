import { localhost, toQuery} from "../utils/utils";

const getImages = async (queries={}) => {
  const res = await fetch(`${localhost}:3000/images${toQuery(queries)}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',      
    },
  })
    .then(val => val.json());
  return res;
}

const createImage = async formData => {
  const res = await fetch(`${localhost}:3000/images/create`, {
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
    },
    body : formData
  })
    .then(val => val.json());
  return res;
}

const deleteImageById = async id => {
  const res = await fetch(`${localhost}:3000/images/${id}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const getImageById = async id => {
  const res = await fetch(`${localhost}:3000/images/${id}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
    },
  })
    .then(val => val.json());
  return res;
}

const updateImageById = async (id, formData, queries) => {
  const res = await fetch(`${localhost}:3000/images/${id}${toQuery(queries)}`, {
    method : 'PATCH',
    headers : {
      'Accept' : 'application/json',
    },
    body : formData
  })
    .then(val => val.json());
  return res;
}

export {getImages, getImageById, deleteImageById, createImage, updateImageById}