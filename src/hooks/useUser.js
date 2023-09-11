import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  useEffect(() => {
    localStorage.setItem('user', user == null ? '' : JSON.stringify(user));
  }, [user]);

  return [user, setUser];
}

export {useUser};