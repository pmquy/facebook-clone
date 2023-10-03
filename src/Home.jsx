import { useContext, useEffect, useRef, useState } from 'react'
import {getPosts, addPost} from './apis/posts'
import Post from './components/Post'
import {ClickOutSideContext, CommonContexts} from './contexts/contexts'
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import UserImage from './components/UserImage';
import ImageComponent from './components/ImageComponent';
import { createImage } from './apis/image';
import { socket } from './socket';

export default function Home() {
  const {user, setIsDark, isDark, isHeaderHidden} = useContext(CommonContexts);
  const clickOutSide = useContext(ClickOutSideContext);
  const ref1 = useRef(); const parentRef1 = useRef();
  clickOutSide([ref1, parentRef1], () => setState1(false));
  const inputRef = useRef();
  const inputImgRef = useRef();
  const [state1, setState1] = useState(false);
  const [tempImg, setTempImg] = useState(null);
  const {isLoading, error, data, refetch:refetchPosts} = useQuery(['posts'], () => getPosts({}));
  
  useEffect(() => {
    if(inputRef.current && ref1.current) {
      inputRef.current.focus();
      ref1.current.value = inputRef.current.value;
    }  
    if(state1) {
      document.body.style.overflow = 'hidden';   
      setIsDark(true);
    }
    else {
      setIsDark(false);
      document.body.style.overflow = '';
    }
  }, [state1])

  useEffect(() => {
    const listener = id => {
      refetchPosts();
    }
    socket.on('change home', listener)
    return () => {
      socket.off('change home', listener);
    }
  }, [])

  const createPost = async (e) => {
    e.preventDefault();            
    if(inputRef.current.value=='' && inputImgRef.current.files.length == 0) {
      alert('Bài viết trống');
      return;
    }
    let imgId = '';
    if(inputImgRef.current.files.length != 0) {
      const formData = new FormData();
      formData.append('image', inputImgRef.current.files[0]);
      const t = await createImage(formData);                      
      inputImgRef.current.value = '';
      if(t._id) {
        imgId = t._id;
      }
    }
    await addPost({text : inputRef.current.value, userId : user._id, img : imgId})
    inputRef.current.value = ''
    socket.emit('change home');
    setState1(false);
    setTempImg(null);            
  }

  const handleChange = e => {
    if(e.target.files && e.target.files[0]) {
      setTempImg(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleDeleteTempImg = e => {
    // prevent useClickOutSide because the remove div is absolute not included to parent div
    e.stopPropagation();
    inputImgRef.current.value = '';
    setTempImg(null);  
  }
  
  return (
    <div>
      {
        isLoading || error ? 
          <></>
        :
        <div>
          <div className={`hidden lg:block ${isDark ? 'hidden pointer-events-none brightness-50' : ''} `}>
            <div className={` bg-blue-600 group w-24 hover:w-60 transition-all px-2 rounded-lg fixed left-2 flex flex-col hover:overflow-y-auto overflow-hidden `} style={{maxHeight:'80vh'}}>  
              
              <Link to={`/user/${user._id}`} className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <div className="w-10 rounded-full overflow-hidden h-10">
                  <ImageComponent id={user.avt}></ImageComponent>      
                </div> 
                <p className=' hidden group-hover:block'>{user.username}</p>
              </Link>          
              
              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/friends.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Bạn bè</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/schedule.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Kỷ niệm</p>
              </a>                

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/save.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Đã lưu</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/group.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Nhóm</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/video.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Video</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/gaming.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Chơi game</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/marketplace.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Marketplace</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/messenger.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Messenger</p>
              </a>

              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/event.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Sự kiện</p>
              </a>
              
              <a href='#' className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
                <img src='/flag.png' className='w-10'></img>
                <p className=' hidden group-hover:block'>Trang</p>
              </a>
                        
            </div>
          </div>      

          <div className={`${isDark ? 'brightness-50 pointer-events-none' : ''} flex flex-row justify-center`}>              
            <div className='lg:basis-6/12 flex flex-col basis-11/12'>          
              <div className={`p-4 bg-blue-600 rounded-lg my-5 flex z-10 sticky ${isHeaderHidden ? 'top-0 ' : 'top-16'} items-center transition-all flex-row gap-5`}>
                <UserImage user={user}/>
                <input ref={ref1} onClick={() => setState1(true)} readOnly className=' indent-4 h-full text-white outline-none placeholder:text-white w-full rounded-3xl bg-stone-400' placeholder={`${user.username} ơi, bạn đang nghĩ gì thế?`}></input>   
              </div>

              {data.map(element => <div key={element._id} className='my-5'>
                <Post post={element}/>
              </div>)}
            </div>
          </div>
          
          <div ref={parentRef1} className={`${state1 ? '' : 'hidden'} z-20 fixed w-4/6 max-h-[80vh] overflow-y-scroll  rounded-lg bg-zinc-600 p-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
            
            <p className=' font-bold text-3xl border-b-2 text-center py-2'>Tạo bài viết</p>
            
            <div className=' flex flex-row items-center gap-2 my-5'>
              <div className="w-12 rounded-full h-12 overflow-hidden">
                <ImageComponent id={user.avt}></ImageComponent>      
              </div>             
              <div className=' flex flex-col justify-center'>
                <p>{user.username}</p>
                <select name='access-modifier' form='myForm' className=' bg-green-600 text-black rounded-lg'>
                  <option className='' value={1}>Công khai</option>
                  <option className='' value={2}>Bạn bè</option>
                  <option className='' value={3}>Riêng tư</option>
                </select>
              </div>
            </div>
            
            <form className='w-full my-2 flex flex-col' id='myForm' onSubmit={createPost}>
              <textarea ref={inputRef} rows={5} className='my-2 indent-4 rounded-lg  text-white outline-none placeholder:text-white w-full bg-stone-400'></textarea>              
              {tempImg && <div className=' flex flex-row justify-center'>
                  <div className=' w-1/2 relative'>
                    <img src={tempImg} className='rounded-lg'></img>                            
                    <img src='/remove.png' onClick={handleDeleteTempImg} className='absolute right-0 top-0 w-10 hover:bg-blue-600 rounded-full bg-white'></img>
                  </div>
              </div>}
              <div className=' rounded-xl p-5 border-2 my-2 flex flex-row lg:justify-between justify-center items-center'>
                <p className='hidden lg:block'>Thêm vào bài viết của bạn</p>
                <div className=' flex flex-row lg:justify-center  items-center'>
                    <div className=' group relative p-2 rounded-full hover:bg-slate-400'>
                      <img onClick={() => inputImgRef.current.click()} className=' w-10' src='/image.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        Ảnh/Video
                      </div>
                      <input ref={inputImgRef} onChange={handleChange} type='file' className=' hidden'></input>
                    </div>
                    <div className=' group relative p-2 rounded-full hover:bg-slate-400'>
                      <img className=' w-10' src='/tag.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        Gắn thẻ người khác
                      </div>
                    </div>
                    <div className='ssm:block hidden group relative p-2 rounded-full hover:bg-slate-400'>
                      <img className=' w-10' src='/emoji.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        Cảm xúc/Hoạt động
                      </div>
                    </div>
                    <div className='sm:block hidden group relative p-2 rounded-full hover:bg-slate-400'>
                      <img className=' w-10' src='/location.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        Check in
                      </div>
                    </div>
                    <div className='md:block hidden group relative p-2 rounded-full hover:bg-slate-400'>
                      <img className=' w-10' src='/gif.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        File GIF
                      </div>
                    </div>
                    <div className=' group relative p-2 rounded-full hover:bg-slate-400'>
                      <img className=' w-10' src='/dots.png'></img>
                      <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                        Xem thêm
                      </div>
                    </div>
                </div>
              </div>          
              <input type='submit' form='myForm' value={'Đăng'} className=' w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-800 hover:rounded-3xl transition-all'></input>
            </form>

          </div>
        </div>
      }
    </div>
  )
}

