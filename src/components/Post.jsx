import { useContext, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query";
import { getUserById } from "../apis/users";
import {getComments, createComment} from "../apis/comment";
import { ClickOutSideContext, CommonContexts } from "../contexts/contexts";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { deletePostById } from "../apis/posts";
import { useNavigate } from "react-router-dom";

export default function Post ({post}) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [isPostReading, setIsPostReading] = useState(false);
  const [isQueryAgain, setIsQueryAgain] = useState(true);
  const parentRef = useRef();
  const ref = useRef();
  const {user, setIsDark} = useContext(CommonContexts);
  const clickOutSide = useContext(ClickOutSideContext);
  clickOutSide([parentRef, ref], () => {setIsPostReading(false)});  

  const inputRef = useRef();
  const {isLoading : isLoading1, error : error1, data : postUser} = useQuery(['postUser', post, isQueryAgain], () => getUserById(post.userId));  
  const {isLoading : isLoading2, error : error2, data : postComments} = useQuery(['postComments', post, isQueryAgain], () => getComments({postId : post._id}))

  useEffect(() => {
    if(isPostReading) {
      document.body.style.overflow = 'hidden';
      inputRef.current.focus();
      // setIsDark(true)
    }
    else {
      document.body.style.overflow = 'auto';
      // setIsDark(false);
    }
  }, [isPostReading])

  const addComment = async() => {
    if(inputRef.current.value) {
      await createComment({userId : user._id, postId : post._id, text : inputRef.current.value});
      inputRef.current.value = '';
    }
  }

  const deletePost = async() => {
    const res = await deletePostById(post._id);
    navigate(0);
  }

  if(isLoading1 || isLoading2 || error1 || error2)
    return <></>
  
  return (
    <div>
      <div className=" group relative">
        <button className="absolute right-0 top-0 w-12 rounded-full hover:bg-slate-400 transition-all">
          <img src="/dots.png"></img>
        </button>
        <div className="hidden group-hover:block absolute -translate-y-full rounded-lg top-0 right-0 bg-green-600 p-5">
          <button onClick={deletePost} className=" bg-red-600 hover:bg-red-800 transition-all p-2 rounded-lg">Delete Post</button>
        </div>
      </div>      

      <div className="p-4 bg-neutral-700 rounded-lg flex flex-col">
        
        <div className=" flex flex-row gap-1 items-center">
          <Link to={`/user/${postUser._id}`}>
            <img src={postUser.photoURL} className=" w-12 rounded-full"></img>
          </Link>
          <div>
            <p className=" text-2xl">{postUser.username}</p>
            <p>{formatDate(post.createAt)}</p>
          </div>
        </div>

        <div className=" my-5 border-b-2 border-white"></div>
        
        <p>{post.text}</p>
       
        <div className="py-2 flex flex-row justify-between">
          
          <div className="flex flex-row items-center gap-1"> 
            <img src="/liked.svg" className=" w-6"></img>
            <p>{post.like}</p>
          </div>

          <div className=" flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-1">
              <img src="/comment.png" className="w-6"></img>       
              <p>{postComments.length}</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <img src="/share.png" className="w-6"></img>
              <p>{post.share}</p>
            </div>
          </div>

        </div>

        <div className=" border-t-2 border-white flex flex-row justify-between py-2 font-bold">
          
          <button onClick={() => {setLike(!like)}} className="flex flex-row px-6 lg:px-10 py-3 hover:bg-slate-400 rounded-lg transition-all items-center gap-2">
            <div className={like ? 'animate-like' : ''}>
              <img src={like? '/liked.svg' : '/like.svg'} className="w-6"></img>
            </div>
            <p className={like ? 'text-blue-600' : ''}>Like</p>
          </button>

          <button ref={ref} onClick={() => {setIsPostReading(true)}} className=" flex flex-row px-6 lg:px-10 py-3 hover:bg-slate-400 rounded-lg transition-all items-center gap-2">
            <img src="/comment.png" className="w-6"></img>
            <p>Comment</p>
          </button>

          <button className=" flex flex-row px-6 lg:px-10 py-3 hover:bg-slate-400 rounded-lg transition-all items-center gap-2">
            <img src="/share.png" className="w-6"></img>
            <p>Share</p>
          </button>
        </div>

      </div>
      
      <div ref={parentRef} className={`${isPostReading ? 'block' : 'hidden'} z-10 rounded-lg fixed left-1/2 -translate-x-1/2 overflow-y-auto w-11/12 lg:w-2/3 top-32`} style={{maxHeight:'70vh'}}>
        <div className=" p-10 bg-slate-500 rounded-lg flex flex-col">
          
          <form onSubmit={async e => {e.preventDefault(); await addComment(); setIsQueryAgain(!isQueryAgain);}}>
            <div className=" flex flex-row items-center gap-2 text-black">
              <img alt="user-image" src={user.photoURL} className=" w-12 rounded-full"></img>
              <input placeholder="bình luận" name="text" ref={inputRef} className=" w-full rounded-lg indent-4 outline-none h-12"></input>
            </div>
          </form>

          {postComments.map(e => (
            <div key={e._id} className=" my-5">
              <Comment comment={e}></Comment>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}