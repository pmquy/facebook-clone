import { useState } from 'react'
import {CommonContexts} from '../contexts/contexts'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {useUser} from '../hooks/useUser';

export default function App({children}) {
  const [user, setUser] = useUser();
  const [isDark, setIsDark] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const queryClient = new QueryClient();  

  return (
    <>
      <CommonContexts.Provider value={{
        user : user,
        setUser : setUser,
        isDark : isDark,
        setIsDark : setIsDark,
        isDarkMode : isDarkMode,
        setIsDarkMode: setIsDarkMode,
      }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CommonContexts.Provider>
    </>
  )
}
