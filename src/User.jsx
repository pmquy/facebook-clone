import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getUserById, updateUserById } from "./apis/users";
import { useContext, useRef, useState } from "react";
import { CommonContexts } from "./contexts/contexts";

export default function User() {
  const {id} = useParams();
  const [isQueryAgain, setIsQueryAgain] = useState(false);
  const {isLoading, error, data:pageUser} = useQuery(['user', id, isQueryAgain], () => getUserById(id));
  const {user, setUser} = useContext(CommonContexts);
  const newPasswordRef = useRef();
  const newPhotoURLRef = useRef();
  
  if(isLoading || error) {
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
    setIsQueryAgain(!isQueryAgain)
  }

  return (
    <div>
      {user._id == pageUser._id ?  
        <div className=" flex flex-col items-center">      
          <div className=" flex flex-row items-center gap-10 mb-10">
            <img src={user.photoURL} className=" w-40 rounded-full"></img>
            <div className=" flex flex-col">
              <p className=" text-6xl ">{user.username}</p>
            </div>
          </div>

          <div>
            <form id="updateForm" onSubmit={async e => {e.preventDefault(); await handleChange()}}>
              <div className=" flex lg:flex-row flex-col text-black my-10 gap-5 items-center justify-between">
                <input form="updateForm" placeholder="new password" ref={newPasswordRef} className=" rounded-lg p-2"></input>
                <input form="updateForm" placeholder="new photourl" ref={newPhotoURLRef} className=" rounded-lg p-2"></input>
                <input form="updateForm" type="submit" className=" bg-green-600 rounded-lg p-2" value={'Change'}></input>
              </div>
            </form>
          </div>
        </div>
        : 
        <div className=" flex-col flex items-center">
          <div className=" flex flex-row items-center gap-10 mb-10">
            <img src={pageUser.photoURL} className=" w-40 rounded-full"></img>
            <div className=" flex flex-col">
              <p className=" text-6xl ">{pageUser.username}</p>
            </div>
          </div>
        </div>
      }
    </div>      
  )
}