import { useQuery } from "react-query"
import { getUserById } from "../apis/users"
import { Link } from "react-router-dom";

export default function Comment({comment}) {
  const {isLoading : isLoading1, error : error1, data : commentUser} = useQuery(['commentUser', comment], () => getUserById(comment.userId));
  if(isLoading1 || error1)
    return <></>
  return (
    <div className=" bg-zinc-700 rounded-lg p-5">
      <div>
        <div className=" flex flex-row items-center gap-2 p-2 border-b border-white mb-2">
          <Link to={`/user/${commentUser._id}`}>
            <img src={commentUser.photoURL} className=" w-10 rounded-full" alt="comment-user"></img>
          </Link>
          <p>{commentUser.username}</p>
        </div>
        
        <p>{comment.text}</p>
      </div>
    </div>
  )
};
