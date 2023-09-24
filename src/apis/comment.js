const getComments = async (queries={}) => {
  const res = await fetch('http://192.168.2.5:3000/comments', {
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
  const res = await fetch('http://192.168.2.5:3000/comments/create', {
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
  const res = await fetch(`http://192.168.2.5:3000/comments/${id}`, {
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