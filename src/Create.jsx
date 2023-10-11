import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUser } from "./apis/users";
import { CommonContexts } from "./contexts/contexts";
import { createImage, deleteImageById } from "./apis/image";
import { toast } from "react-toastify";

export default function Create() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const avtRef = useRef();
  const {setUser} = useContext(CommonContexts);  
 
  const handleCreate = async (e) => {
    e.preventDefault();
    if(!usernameRef.current.value || !passwordRef.current.value || avtRef.current.files.length == 0) {
      toast.warning("Không được để trống");
      return;
    }    
    const formData = new FormData();
    formData.append('image', avtRef.current.files[0]); 
    const avt = await createImage(formData)
    const user = await createUser({username: usernameRef.current.value, password:passwordRef.current.value, avt:avt._id});
    if(!user) {
      toast.warning('Tài khoản đã tồn tại');
      await deleteImageById(avt._id);
      return;
    }
    toast.success('Tạo tài khoản thành công!')
    setUser(user);
    navigate('/');  
  }

  return (
    <div className=" min-h-screen bg-zinc-800 flex flex-row justify-center items-center">
      <form onSubmit={handleCreate} className=" flex flex-col justify-center items-center p-10 border-2 border-white rounded-lg">
        <input ref={usernameRef} placeholder="username" className="p-4 rounded-lg my-2"></input>                
        <input ref={passwordRef} placeholder="password" className="p-4 rounded-lg my-2" ></input>
        <input type="file" ref={avtRef} className="p-4 rounded-lg my-2"></input>                        
        <input type="submit" value={'Create'} className=" cursor-pointer my-2 rounded-lg p-3 bg-blue-600 w-full hover:bg-blue-800 transition-all"></input>
        <button onClick={() => {navigate('/user/login');}} className=" cursor-pointer my-2 rounded-lg p-3 bg-green-600 hover:bg-green-800 transition-all">Login</button>
      </form>
    </div>
  )
}