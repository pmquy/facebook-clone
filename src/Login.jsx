import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "./apis/users";
import { CommonContexts } from "./contexts/contexts";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loginState, setLoginState] = useState(0);
  const {setUser, user} = useContext(CommonContexts);

  useEffect(() => {
    if(user)
      navigate('/');
  }, [])

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if(!username && !password)
      setLoginState(1);
    else if(!username)
      setLoginState(2);
    else if(!password)
      setLoginState(3);
    else {
      const user = await login({username:username, password:password});
      if(!user)
        setLoginState(4);
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      setUser(user);
      navigate('/');
    }
  }

  return (
    <div className=" min-h-screen bg-zinc-800 flex flex-row justify-center items-center">
      <form onSubmit={async (e) => {e.preventDefault(); await handleLogin()}} className=" flex flex-col justify-center items-center p-10 border-2 border-white rounded-lg">
        <input ref={usernameRef} placeholder="username" className={`${(loginState==1 || loginState==2) ? ' border-2 border-red-600' : ''} box-border p-3 indent-4 rounded-lg my-2`}></input>                
        <input type="password" ref={passwordRef} placeholder="password" className={`${(loginState==1 || loginState==3) ? ' border-2 border-red-600' : ''} box-border p-3 indent-4 rounded-lg my-2`}></input>                
        {loginState==4 && 
        <div className=" text-white">
          Thông tin tài khoản hoặc mật khẩu không chính xác
        </div>}
        <input type="submit" value={'Login'} className=" cursor-pointer my-2 rounded-lg p-3 bg-blue-600 w-full hover:bg-blue-800 transition-all"></input>
        <button onClick={() => {navigate('/user/create');}} className=" cursor-pointer my-2 rounded-lg p-3 bg-green-600 hover:bg-green-800 transition-all">Create new account</button>
      </form>
    </div>
  )
}