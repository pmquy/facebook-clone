const getComments = async (queries={}) => {
  const res = await fetch('http://localhost:3000/comments', {
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

const createComment = async comment => {
  const res = await fetch('http://localhost:3000/comments/create', {
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

export {getComments, createComment};