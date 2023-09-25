import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getUserById, updateUserById } from "./apis/users";
import { useContext, useRef, useState } from "react";
import { CommonContexts } from "./contexts/contexts";
import { getPosts } from "./apis/posts";
import Post from './components/Post'

export default function User() {
  const {id} = useParams();
  const {isLoading, error, data:pageUser, refetch} = useQuery(['user', id], () => getUserById(id));
  const {isLoading:isLoading1, error:error1, data:posts, refetch:refetch1} = useQuery(['posts', id],() => getPosts({userId : id}))
  const {user, setUser} = useContext(CommonContexts);
  const newPasswordRef = useRef();
  const newPhotoURLRef = useRef();
  
  if(isLoading || error || isLoading1 || error1) {
    return <></>
  }

  const handleChange = async ()=> {
    const newPassword = newPasswordRef.current.value;
    const newPhotoURL = newPhotoURLRef.current.value;
    if(!newPassword && !newPhotoURL) {
      alert('Không được để trống');
      return;
    }
    const queries = {};
    if(newPassword)
      queries.password = newPassword;    
    if(newPhotoURL)
      queries.photoURL = newPhotoURL;
    const newUser = await updateUserById(user._id, queries);
    newPasswordRef.current.value = '';
    newPhotoURLRef.current.value = '';
    setUser(newUser);
    refetch()
  }

  return (
    <div>
      <div className=" flex flex-col items-center">
        <div className=" flex flex-row items-center justify-center gap-10 mb-10">
          <img src={pageUser.photoURL} className=" w-40 rounded-full"></img>
          <div className=" flex flex-col">
            <p className=" text-6xl ">{pageUser.username}</p>
          </div>
        </div>

        {user._id == pageUser._id && 
          <div>
            <form id="updateForm" onSubmit={async e => {e.preventDefault(); await handleChange()}}>
              <div className=" flex lg:flex-row flex-col text-black my-10 gap-5 items-center justify-between">
                <input form="updateForm" placeholder="new password" ref={newPasswordRef} className=" indent-6 rounded-lg p-2"></input>
                <input form="updateForm" placeholder="new photourl" ref={newPhotoURLRef} className=" indent-6 rounded-lg p-2"></input>
                <input form="updateForm" type="submit" className=" cursor-pointer hover:bg-green-800 transition-all bg-green-600 rounded-lg p-2" value={'Change'}></input>
              </div>
            </form>
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