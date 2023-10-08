import Header from "./Header"
import { useContext, useEffect} from "react"
import { CommonContexts } from "../contexts/contexts";
import { useNavigate , useLocation} from "react-router-dom";

export default function Layout({children, index}) {  
  const navigate = useNavigate();
  const location = useLocation();
  const {isDark, user, isHeaderHidden, setIsHeaderHidden} = useContext(CommonContexts);
  
  useEffect(() => {    
    const listener = () => {      
      if(setIsHeaderHidden != (window.scrollY > 1000)) {
        setIsHeaderHidden(window.scrollY > 1000);
      }
    }
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [])  
  
  useEffect(() => {
    if(!user) {
      navigate('/user/login', {state : {from : location.pathname}});
    }
  }, [user])
  
  return (
    <div>
      {
        user?
        <div className="bg-zinc-800 text-white">    
          <div className={`${isDark ? 'brightness-50 pointer-events-none' : ''} ${isHeaderHidden ? ' -translate-y-full' : ''} z-20 transition-all fixed top-0`}>
            <Header index={index}></Header>
          </div>
    
          <div className='mt-16 min-h-screen py-10'>
            {children}
          </div>
        </div>
        :
        <div className=" min-h-screen bg-zinc-800"></div>
      }
    </div>
  )
}