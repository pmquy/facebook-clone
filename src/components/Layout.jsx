import Header from "./Header"
import { useContext, useEffect, useState} from "react"
import { CommonContexts } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";

export default function Layout({children, index}) {  
  const navigate = useNavigate();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);   
  const {isDark, user} = useContext(CommonContexts);
  
  useEffect(() => {    
    const listener = () => {
      if(window.scrollY > 1000)
        setIsHeaderHidden(true);
      else {
        setIsHeaderHidden(false);
      }
    }
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [])  

  useEffect(() => {
    if(!user) {
      navigate('/user/login');
    }
  }, [user])  

  if(!user)
    return (
      <div className=" min-h-screen bg-zinc-800"></div>
    )

  return (
    <div className="bg-zinc-800 text-white">
      <div className={`${isDark ? 'brightness-50 pointer-events-none' : ''} ${isHeaderHidden ? ' -translate-y-full' : ''} transition-all fixed top-0`}>
        <Header index={index}></Header>
      </div>

      <div className='mt-16 min-h-screen py-10'>
        {children}
      </div>
    </div>
  )
}