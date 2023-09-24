import { useEffect, useState } from "react";
import { socket } from "../socket";

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  useEffect(() => {
    if(user) {
      socket.emit('someone login', user._id);
    }
    try {
      localStorage.setItem('user', user == null ? '' : JSON.stringify(user));
    }
    catch(e) {

    }
  }, [user]);

  return [user, setUser];
}

export {useUser};