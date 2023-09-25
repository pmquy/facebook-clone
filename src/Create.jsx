import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUser } from "./apis/users";
import { CommonContexts } from "./contexts/contexts";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [createState, setCreateState] = useState(0);
  const {setUser} = useContext(CommonContexts);
  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if(!username && !password)
      setCreateState(1);
    else if(!username)
      setCreateState(2);
    else if(!password)
      setCreateState(3);
    else {
      const user = await createUser({username:username, password:password});
      if(!user) {
        setCreateState(4);
        return;
      }
      setUser(user);
      navigate('/');
    }
  }

  return (
    <div className=" min-h-screen bg-zinc-800 flex flex-row justify-center items-center">
      <form onSubmit={async (e) => {e.preventDefault(); await handleLogin()}} className=" flex flex-col justify-center items-center p-10 border-2 border-white rounded-lg">
        <input ref={usernameRef} placeholder="username" className={`${(createState==1 || createState==2) ? ' border-2 border-red-600' : ''} box-border p-3 indent-4 rounded-lg my-2`}></input>                
        <input ref={passwordRef} placeholder="password" className={`${(createState==1 || createState==3) ? ' border-2 border-red-600' : ''} box-border p-3 indent-4 rounded-lg my-2`}></input>                
        {createState==4 && 
        <div className=" text-white"> 
          Tài khoản đã tồn tại
        </div>}
        <input type="submit" value={'Create'} className=" cursor-pointer my-2 rounded-lg p-3 bg-blue-600 w-full hover:bg-blue-800 transition-all"></input>
        <button onClick={() => {navigate('/user/login');}} className=" cursor-pointer my-2 rounded-lg p-3 bg-green-600 hover:bg-green-800 transition-all">Login</button>
      </form>
    </div>
  )
}