import { useEffect, useState } from "react";
import { updateUserById } from "../apis/users";
import { updatePostById } from "../apis/posts";
import {socket} from '../socket'

const useLikePost = (post, user, setUser, queryClient) => {  
  const [isLike, setIsLike] = useState(user && user.likedPosts && user.likedPosts.indexOf(post._id) != -1)

  const handleLike = async () => {
    if(isLike && user.likedPosts.indexOf(post._id) == -1) {
      user = await updateUserById(user._id, {likedPosts : [...user.likedPosts, post._id]})
      await updatePostById(post._id, {like : post.like + 1})
      setUser(user);
      socket.emit('dataUpdate', {
        queryKey : ['posts'],
      })
      queryClient.invalidateQueries({
        queryKey : ['posts']
      });     
    }
    if(!isLike && user.likedPosts.indexOf(post._id) != -1) {
      user = await updateUserById(user._id, {likedPosts : user.likedPosts.filter(e => e != post._id)})
      await updatePostById(post._id, {like : post.like - 1})
      setUser(user);
      socket.emit('dataUpdate', {
        queryKey : ['posts'],
      })     
      queryClient.invalidateQueries({
        queryKey : ['posts']
      });     
    }
  }

  useEffect(() => {
    handleLike();
  }, [isLike])

  return [isLike, setIsLike];
}

export default useLikePost;