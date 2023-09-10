const addPost = async (post) => {
  const res = await fetch('http://localhost:3000/posts/create', {
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
  const res = await fetch('http://localhost:3000/posts', {
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

export {addPost, getPosts}