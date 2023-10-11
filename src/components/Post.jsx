import { useContext, useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserById } from "../apis/users";
import {getComments, createComment} from "../apis/comment";
import { ClickOutSideContext, CommonContexts } from "../contexts/contexts";
import Comment from "./Comment";
import { formatDate } from "../utils/utils";
import { deletePostById } from "../apis/posts";
import UserImage from "./UserImage";
import ImageComponent from "./ImageComponent";
import {socket} from '../socket'
import { getUserLikePost, deleteUserLikePost, createUserLikePost} from "../apis/userLikePost";
import { toast } from "react-toastify";


export default function Post ({post}) {
  const queryClient = useQueryClient();
  const {user} = useContext(CommonContexts);
  const [isPostReading, setIsPostReading] = useState(false);
  const inputRef = useRef();
  const ref = useRef();
  const parentRef = useRef();
  const clickOutSide = useContext(ClickOutSideContext);
  clickOutSide([parentRef, ref], () => {setIsPostReading(false)});  
  const [like, setLike] = useState(null);

  const changeLike = async () => {
    if(like != null) {
      if(like) {
        await deleteUserLikePost({userId : user._id, postId : post._id});
      } else {
        await createUserLikePost({userId : user._id, postId : post._id});
      }
      setLike(!like);
    }
  }

  const mutationLike = useMutation({
    mutationFn : changeLike,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['posts'],
      })
      socket.emit('dataUpdate', {
        queryKey : ['posts']
      })
    }
  })

  const userLikePostQuery = useQuery({
    queryKey : ['likePost', user._id, post._id],
    queryFn : async () => {
      const res = await getUserLikePost({userId : user._id, postId : post._id});
      setLike(res.length ? true : false);
    }
  })
  
  const userQuery = useQuery(['user', post.userId], () => getUserById(post.userId));  
  const commentsQuery = useQuery(['comments', post._id], () => getComments({postId : post._id}))
  const muation = useMutation({
    mutationFn : createComment,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['comments', post._id]
      });
      socket.emit('dataUpdate', {
        queryKey : ['comments', post._id],
      });
    }
  })

  const addComment = async() => {
    if(inputRef.current.value) {
      muation.mutate({userId : user._id, postId : post._id, text : inputRef.current.value});    
      inputRef.current.value = '';
    } else {
      toast.warning('Không được để trống')
    }
  }
  
  const mutationHome = useMutation({
    mutationFn : deletePostById,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['posts'],
      })
      socket.emit('dataUpdate', {
        queryKey : ['posts']
      })
    }
  })

  useEffect(() => {
    if(isPostReading) {
      document.body.style.overflow = 'hidden';
      inputRef.current.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPostReading])
  
  return (
    <div>
      {userLikePostQuery.isLoading || userLikePostQuery.isError || userQuery.isError || userQuery.isError || commentsQuery.isError || commentsQuery.isLoading ?
        <></>
        :
        <div>
          <div className="p-4 bg-neutral-700 rounded-lg flex flex-col">        
            {post.userId == user._id && 
              <div className=" group relative">
                <button className="absolute right-0 top-0 w-12 rounded-full hover:bg-slate-400 transition-all">
                  <img src="/dots.png"></img>
                </button>
                <div className="hidden group-hover:block absolute -translate-y-full rounded-lg top-0 right-0 bg-green-600 p-5">
                  <button onClick={() => {mutationHome.mutate(post._id)}} className=" bg-red-600 hover:bg-red-800 transition-all p-2 rounded-lg">Delete Post</button>
                </div>
              </div>      
            }
            <div className=" flex flex-row gap-1 items-center">
              <UserImage user={userQuery.data}/>
              <div>
                <p className=" text-2xl">{userQuery.data.username}</p>
                <p>{formatDate(post.createAt)}</p>
              </div>
            </div>

            <div className=" my-5 border-b-2 border-white"></div>
            
            {post.text && <p className=" break-all my-2">
              {post.text}  
            </p>}

            {post.img && <div className=" w-full my-2 rounded-lg overflow-hidden">
              <ImageComponent id={post.img}></ImageComponent>  
            </div>}
          
            <div className="py-2 flex flex-row justify-between">
              
              <div className="flex flex-row items-center gap-1"> 
                <img src="/liked.svg" className=" w-6"></img>
                <p>{post.like}</p>
              </div>

              <div className=" flex flex-row gap-5 items-center">
                <div className="flex flex-row gap-1">
                  <img src="/comment.png" className="w-6"></img>       
                  <p>{commentsQuery.data.length}</p>
                </div>

                <div className="flex flex-row items-center gap-1">
                  <img src="/share.png" className="w-6"></img>
                  <p>{post.share}</p>
                </div>
              </div>

            </div>

            <div className=" border-t-2 border-white flex flex-row justify-between py-2 font-bold">
              
              <button onClick={() => mutationLike.mutate()} className="flex flex-row px-6 lg:px-10 py-3 hover:bg-slate-400 rounded-lg transition-all items-center gap-2">
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
            <div className=" p-10 bg-blue-600 rounded-lg flex flex-col">
              
              <form onSubmit={async e => {e.preventDefault(); await addComment();}}>
                <div className=" flex flex-row items-center gap-2 ">
                  <UserImage user={user}/>
                  <input placeholder="bình luận" name="text" ref={inputRef} className=" text-black w-full rounded-lg indent-4 outline-none h-12"></input>
                </div>
              </form>

              {commentsQuery.data.map(e => (
                <div key={e._id} className=" my-5">
                  <Comment comment={e}></Comment>
                </div>
              ))}

            </div>
          </div>
        </div>
      }
    </div>
  )
}