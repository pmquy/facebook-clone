import { useState } from 'react'
import {CommonContexts} from '../contexts/contexts'
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({children}) {
  const [user, setUser] = useState(null);
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
