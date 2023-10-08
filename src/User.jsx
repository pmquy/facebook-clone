import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
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
  const {isLoading, error, data:pageUser} = useQuery(['user', id], () => getUserById(id));
  const {isLoading:isLoading1, error:error1, data:posts} = useQuery(['posts', id],() => getPosts({userId : id}))
  const {user, setUser} = useContext(CommonContexts);
  const newPasswordRef = useRef();
  const newAvtRef = useRef();
  const [tempImg, setTempImg] = useState(null);
  
  const handleChange = async e => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;    
    if(!newPassword.trim()) {
      alert('Không được để trống');
      return;
    }     
    const newUser = await updateUserById(user._id, {password : newPassword});
    newPasswordRef.current.value = '';
    setUser(newUser);
  }

  const queryClient = useQueryClient();
  const mutationImage = useMutation({
    mutationFn : updateImageById,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['image', user.avt],
      })
      socket.emit('dataUpdate', {
        queryKey : ['image', user.avt],
      })
    }
  })

  const handleChangeAvt = async () => {
    if(newAvtRef.current.files.length == 0) {
      alert("Không được để trống");
      return;
    }
    const formData = new FormData();
    formData.append('image', newAvtRef.current.files[0]);    
    newAvtRef.current.value = ''
    setTempImg(null);
    mutationImage.mutate({id : user.avt, formData : formData});
  }

  const handleChangePreviewImg = e => {
    if(e.target.files && e.target.files[0]) {
      if(e.target.files[0].size > 5000000) {
        alert('Image too big bro !');
        return;
      }
      setTempImg(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleDeletePreviewImg = e => {  
    newAvtRef.current.value = '';
    setTempImg(null);  
  }
  
  return (
    <div>
      {isLoading || error || isLoading1 || error1 ? 
      <></>
      :
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
                <div className=" flex lg:flex-row flex-col text-black my-10 gap-5 items-center justify-center">
                  <input form="updateForm" placeholder="new password" ref={newPasswordRef} className=" indent-6 rounded-lg p-2"></input>                
                  <input form="updateForm" type="submit" className=" cursor-pointer hover:bg-green-800 transition-all bg-green-600 rounded-lg p-2" value={'Đổi mật khẩu'}></input>
                </div>
              </form>

              {tempImg && <div className=' flex flex-row justify-center'>
                <div className=' w-1/2 relative'>
                  <img src={tempImg} className='rounded-lg'></img>                            
                  <img src='/remove.png' onClick={handleDeletePreviewImg} className='absolute right-0 top-0 w-10 hover:bg-blue-600 rounded-full bg-white'></img>
                </div>
              </div>}

              <div className=" my-5 flex lg:flex-row flex-col items-center justify-center gap-5">
                <input ref={newAvtRef} onChange={handleChangePreviewImg} className="hidden" type="file" accept="image/*"></input>   
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
    }
    </div>
  )
}