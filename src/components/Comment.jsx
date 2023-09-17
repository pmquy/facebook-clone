import { useQuery } from "react-query"
import { getUserById } from "../apis/users"
import { Link } from "react-router-dom";
import {formatDate} from '../utils/utils';
import { deleteCommentById } from "../apis/comment";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CommonContexts } from "../contexts/contexts";

export default function Comment({comment}) {
  const navigate = useNavigate();
  const {isLoading : isLoading1, error : error1, data : commentUser} = useQuery(['commentUser', comment], () => getUserById(comment.userId));
  const {user} = useContext(CommonContexts);

  const deleteComment = async () => {
    const res = await deleteCommentById(comment._id);
    navigate(0);
  }
  
  if(isLoading1 || error1)
    return <></>

  
  return (
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
          <Link to={`/user/${commentUser._id}`}>
            <img src={commentUser.photoURL} className=" w-10 rounded-full" alt="comment-user"></img>
          </Link>
          <div>
            <p>{commentUser.username}</p>
            <p>{formatDate(comment.createAt)}</p>
          </div>
        </div>
        
        <p>{comment.text}</p>
      </div>

    </div>
  )
};
