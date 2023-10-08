import { useMutation, useQuery, useQueryClient } from "react-query"
import { getUserById } from "../apis/users"
import {formatDate} from '../utils/utils';
import { deleteCommentById } from "../apis/comment";
import { useContext } from "react";
import { CommonContexts } from "../contexts/contexts";
import UserImage from "./UserImage";
import { socket } from "../socket";

export default function Comment({comment}) {
  const userQuery = useQuery(['user', comment.userId], () => getUserById(comment.userId));
  const {user} = useContext(CommonContexts);
  
  const queryClient = useQueryClient();
  const muation = useMutation({
    mutationFn : deleteCommentById,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['comments', comment.postId],
      })
      socket.emit('dataUpdate', {
        queryKey : ['comments', comment.postId],
      })
    }
  })
  
  const deleteComment = () => {
    muation.mutate(comment._id);  
  }
  
  return (
    <div>
      {userQuery.isLoading || userQuery.isError ? 
        <></>
        :
        <div className=" bg-zinc-700 rounded-lg p-5">
          
          {comment.userId == user._id && 
            <div className=" group relative">
              <button className=" absolute right-0 top-0 w-12 rounded-full hover:bg-slate-400 transition-all">
                <img src="/dots.png"></img>
              </button>
              <div className=" hidden group-hover:block absolute -translate-y-full rounded-lg top-0 right-0 bg-green-600 p-5">
                <button onClick={deleteComment} className=" bg-red-600 hover:bg-red-800 transition-all p-2 rounded-lg">Delete Comment</button>
              </div>
            </div>   
          }

          <div>
            <div className=" flex flex-row items-center gap-2 p-2 border-b border-white mb-2">
              <UserImage user={userQuery.data}/>
              <div>
                <p>{userQuery.data.username}</p>
                <p>{formatDate(comment.createAt)}</p>
              </div>
            </div>
            
            <p>{comment.text}</p>
          </div>

        </div>
      }
    </div>
  )
};
