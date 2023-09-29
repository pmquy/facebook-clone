import { useEffect, useState } from 'react'
import {CommonContexts} from '../contexts/contexts'
import { QueryClient, QueryClientProvider } from 'react-query';
import {useUser} from '../hooks/useUser';
import { socket } from '../socket';

export default function App({children}) {
  const [user, setUser] = useUser();
  const [isDark, setIsDark] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);   
  const queryClient = new QueryClient();  

  useEffect(() => {
    const listener = id => {
      if(user && user._id == id) {
        alert("Tài khoản bạn đã được đăng nhập nơi khác")      
        setUser(null);        
      }
    }
    socket.on('someone login', listener)
    return () => {
      socket.off('someone login', listener);
    }
  }, [])

  return (
    <>
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
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CommonContexts.Provider>
    </>
  )
}
