import { useQuery } from "react-query";
import { getUserById } from "../apis/users";
import { useContext } from "react";
import { CommonContexts } from "../contexts/contexts";
import UserImage from "./UserImage";
import {formatDate} from "../utils/utils"

export default function Message({message}) {
  const {isLoading, error, data:messageUser} = useQuery(['user', message.userId], () => getUserById(message.userId));
  const {user} = useContext(CommonContexts);
  
  if(isLoading || error) 
    return <></>

  return (
    <div>
      { user._id == messageUser._id ? 
        <div className=" flex flex-row items-center gap-5 justify-end">
          <div className="group bg-green-600 rounded-lg p-4 relative">
            <p>{message.text}</p>
            <div className=" hidden group-hover:block right-0 top-0 -translate-y-full p-2 bg-slate-400 rounded-lg absolute whitespace-nowrap">
              {formatDate(message.createAt)}
            </div>
          </div>
          <UserImage user={messageUser}/>
        </div>
        :
        
        <div className=" flex flex-row items-center gap-5 justify-start">
          <UserImage user={messageUser}/>
          <div className="group bg-green-600 rounded-lg p-4 relative">
            <p>{message.text}</p>
            <div className=" hidden group-hover:block right-0 top-0 -translate-y-full p-2 bg-slate-400 rounded-lg absolute whitespace-nowrap">
              {formatDate(message.createAt)}
            </div>
          </div>
        </div>
      }
    </div>
  )
}