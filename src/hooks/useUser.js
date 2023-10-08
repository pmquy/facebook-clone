import { useEffect, useState } from "react";
import { socket } from "../socket";

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  
  useEffect(() => {
    if(user) {
      socket.emit('someone login', user._id);
    }
    localStorage.setItem('user', user ? JSON.stringify(user) : '');    
  }, [user]); 

  return [user, setUser];
}

export {useUser};