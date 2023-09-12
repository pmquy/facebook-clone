import { useContext, useEffect, useRef, useState } from 'react'
import {getPosts, addPost} from './apis/posts'
import Post from './components/Post'
import {ClickOutSideContext, CommonContexts} from './contexts/contexts'
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';


export default function Home() {
  const {user, setIsDark, isDark} = useContext(CommonContexts);
  const clickOutSide = useContext(ClickOutSideContext);
  const ref1 = useRef();
  const parentRef1 = useRef();
  const [isQueryAgain, setQueryAgain] = useState(false);
  const inputRef = useRef();
  const [state1, setState1] = useState(false);
  const {isLoading, error, data} = useQuery(['posts', isQueryAgain], () => getPosts({}));

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

  clickOutSide([ref1, parentRef1], () => setState1(false));
  
  if(isLoading || error)
    return <></>
  
  return (
    <div>

      <div className={`${isDark ? 'brightness-50 pointer-events-none' : ''} flex flex-row justify-center`}>      
        
        <div className={`hidden lg:block`}>
          <div className={` bg-blue-600 group w-24 hover:w-60 transition-all px-2 rounded-lg fixed left-2 flex flex-col hover:overflow-y-auto overflow-hidden `} style={{height:'80vh'}}>  
            
            <Link to={`/user/${user._id}`} className=' whitespace-nowrap border-2 border-black flex flex-row my-2 rounded-lg gap-5 p-2 items-center hover:bg-slate-400 transition-all'>
              <img src={user.photoURL} className=' rounded-full w-10'></img>
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

        <div className='lg:basis-6/12 flex flex-col basis-11/12'>          
          <div className='p-4 bg-neutral-700 rounded-lg my-5 flex flex-row gap-5'>
            <Link to={`/user/${user._id}`}>
              <img src={user.photoURL} className=' rounded-full w-12'></img>                
            </Link>
            <input ref={ref1} onClick={() => setState1(true)} readOnly className=' indent-4 h-full text-white outline-none placeholder:text-white w-full rounded-3xl bg-stone-400' placeholder={`${user.username} ơi, bạn đang nghĩ gì thế?`}></input>   
          </div>

          {data.map(element => <div key={element._id} className='my-5'>
            <Post className='' post={element}/>
          </div>)}
        </div>
        
      </div>
      
      <div ref={parentRef1} className={`${state1 ? '' : 'hidden'} z-20 fixed w-4/6 rounded-lg bg-zinc-600 p-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
        
        <p className=' font-bold text-3xl border-b-2 my-2 text-center py-2'>Tạo bài viết</p>
        
        <div className=' flex flex-row items-center gap-2 my-5'>
          <img src={user.photoURL} className=' rounded-full w-12'></img>                
          <div className=' flex flex-col justify-center'>
            <p>{user.username}</p>
            <select name='access-modifier' form='myForm' className=' bg-green-600 text-black rounded-lg'>
              <option className='' value={1}>Công khai</option>
              <option className='' value={2}>Bạn bè</option>
              <option className='' value={3}>Riêng tư</option>
            </select>
          </div>
        </div>
        
        <form className='w-full my-2' id='myForm' 
          onSubmit={async (e) => {
            e.preventDefault();
            if(inputRef.current.value) {
              await addPost({text : inputRef.current.value, userId : user._id})
              setState1(false);
              inputRef.current.value = '';
              setQueryAgain(!isQueryAgain);
            }
          }}>
          <textarea ref={inputRef} form='myForm' name='text' rows={5} className=' indent-4  text-white outline-none placeholder:text-white w-full bg-stone-400'></textarea>
          
          <div className=' rounded-xl p-5 border-2 my-2 flex flex-row lg:justify-between justify-center items-center'>
            <p className='hidden lg:block'>Thêm vào bài viết của bạn</p>
            <div className=' flex flex-row lg:justify-center  items-center'>
                <div className=' group relative p-2 rounded-full hover:bg-slate-400'>
                  <img className=' w-10' src='/image.png'></img>
                  <div className=' absolute whitespace-nowrap left-1/2 -translate-x-1/2 -translate-y-32 rounded-xl p-5 bg-slate-400 hidden group-hover:block'>
                    Ảnh/Video
                  </div>
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
  )
}

