const login = async (user) => {
  const res = await fetch('http://localhost:3000/users', {
    method:'POST',
    mode : 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(user),
  })
    .then(val => val.json());
  if(res.length == 0)
    return null;
  return res[0];
}

const getUserById = async id => {
  const user = await fetch(`http://localhost:3000/users/${id}`, {
    method:'GET',
    mode : 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(val => val.json());
  return user;
}

const createUser = async (user) => {
  const res = await fetch('http://localhost:3000/users/create', {
    method:'POST',
    mode : 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({photoURL : 'https://t2.genius.com/unsafe/375x0/https%3A%2F%2Fimages.genius.com%2F4e68b153e20cc5c4d4a06f9945eeafca.1000x1000x1.jpg', ...user}),
  })
    .then(val => val.json());
  if(Object.keys(res) == 0)
    return null;
  return res;
}

const updateUserById = async (id, queries) => {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method:'PATCH',
    mode : 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(queries),
  })
    .then(val => val.json());
  return res;
}

export {login, createUser, getUserById, updateUserById};