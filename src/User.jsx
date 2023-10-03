import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUserById } from "./apis/users";
import { useContext, useEffect, useRef, useState } from "react";
import { CommonContexts } from "./contexts/contexts";
import { getPosts } from "./apis/posts";
import Post from './components/Post'
import ImageComponent from "./components/ImageComponent";
import { updateImageById } from "./apis/image";
import { socket } from "./socket";

export default function User() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {isLoading, error, data:pageUser, refetch:refetchUser} = useQuery(['user', id], () => getUserById(id));
  const {isLoading:isLoading1, error:error1, data:posts, refetch:refetch1} = useQuery(['posts', id],() => getPosts({userId : id}))
  const {user, setUser} = useContext(CommonContexts);
  const newPasswordRef = useRef();
  const newAvtRef = useRef();
  
  useEffect(() => {
    const listener = () => {
      refetch1();
    }
    socket.on('change home', listener);
    return () => {
      socket.off('change home', listener);
    }
  })
  
  const handleChange = async e => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;    
    if(!newPassword) {
      alert('Không được để trống');
      return;
    }
    const queries = {};
    queries.password = newPassword;        
    const newUser = await updateUserById(user._id, queries);
    newPasswordRef.current.value = '';
    setUser(newUser);
  }

  const handleChangeAvt = async () => {
    if(newAvtRef.current.files.length == 0) {
      alert("Không được để trống");
      return;
    }
    const formData = new FormData();
    formData.append('image', newAvtRef.current.files[0]);    
    await updateImageById(user.avt, formData);
    newAvtRef.current.value = ''
    navigate(0);
  }
  
  if(isLoading || error || isLoading1 || error1) {
    return <></>
  }

  return (
    <div>
      <div className=" flex flex-col items-center">
        <div className=" flex flex-row items-center justify-center gap-10 mb-10">          
          <div className="w-40 rounded-full h-40 overflow-hidden">
            <ImageComponent id={pageUser.avt} isRound={true}></ImageComponent>      
          </div>
          <div className=" flex flex-col">
            <p className=" text-6xl ">{pageUser.username}</p>
          </div>
        </div>

        {user._id == pageUser._id && 
          <div>
            <form id="updateForm" onSubmit={handleChange}>
              <div className=" flex lg:flex-row flex-col text-black my-10 gap-5 items-center justify-between">
                <input form="updateForm" placeholder="new password" ref={newPasswordRef} className=" indent-6 rounded-lg p-2"></input>                
                <input form="updateForm" type="submit" className=" cursor-pointer hover:bg-green-800 transition-all bg-green-600 rounded-lg p-2" value={'Đổi mật khẩu'}></input>
              </div>
            </form>

            <div className=" my-5 flex lg:flex-row flex-col items-center justify-center gap-5">
              <input ref={newAvtRef} className="hidden" type="file"></input>   
              <button button onClick={() => {newAvtRef.current.click()}} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition-all">Chọn ảnh</button>                           
              <input onClick={handleChangeAvt} type="submit" value={"Đổi ảnh đại diện"} className=" cursor-pointer hover:bg-green-800 transition-all bg-green-600 rounded-lg p-2"></input>                
            </div>

          </div>
        }      
        
      </div>     

      <div className=" flex flex-row justify-center">
        <div className=" lg:basis-1/2 basis-11/12">
          {posts.map(element => <div key={element._id} className='my-10'>
            <Post className='' post={element}/>
          </div>)}
        </div>
      </div>

    </div>      
  )
}