import { useEffect, useState } from 'react'
import {CommonContexts} from '../contexts/contexts'
import {useUser} from '../hooks/useUser';
import { useQueryClient } from 'react-query';
import { socket } from '../socket';
import {toast} from 'react-toastify'

export default function App({children}) {
  const [user, setUser] = useUser();
  const [isDark, setIsDark] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
      

  useEffect(() => {
    const listener = id => {
      if(user && user._id == id) {
        toast.warning("Tài khoản bạn đã được đăng nhập nơi khác!");
        setUser(null);        
      }
    }
    socket.on('someone login', listener)
    return () => {
      socket.off('someone login', listener);
    }
  }, [])

  const queryClient = useQueryClient();
  useEffect(() => {
    const listener = data => {
      queryClient.invalidateQueries({
        queryKey : data.queryKey,
      }); 
    }
    socket.on('dataUpdate', listener)
    return () => socket.off('dataUpdate', listener);
  }, [])

  return (
    <div>
      <CommonContexts.Provider value={{
        user : user,
        setUser : setUser,
        isDark : isDark,
        setIsDark : setIsDark,
        isDarkMode : isDarkMode,
        setIsDarkMode: setIsDarkMode,
        isHeaderHidden : isHeaderHidden,
        setIsHeaderHidden : setIsHeaderHidden,
      }}>  
        {children}    
      </CommonContexts.Provider>   
    </div>   
  )
}
