import { useContext, useEffect, useRef, useState } from "react"
import { CommonContexts, ClickOutSideContext } from "../contexts/contexts"
import { Link } from "react-router-dom";
import ImageComponent from "./ImageComponent";

export default function Header({index}) {  
  const {user, setUser} = useContext(CommonContexts);  
  const clickOutSide = useContext(ClickOutSideContext);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const parentRef1 = useRef();
  const parentRef2 = useRef();
  const parentRef3 = useRef();
  const parentRef4 = useRef();
  const parentRef5 = useRef();

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);
  const [state5, setState5] = useState(false);
  
  clickOutSide([ref1, parentRef1], () => {setState1(false)})
  clickOutSide([ref2, parentRef2], () => {setState2(false)})
  clickOutSide([ref3, parentRef3], () => {setState3(false)})
  clickOutSide([ref4, parentRef4], () => {setState4(false)})
  clickOutSide([ref5, parentRef5], () => {setState5(false)})

  useEffect(() => {
    if(state5)
      ref5.current.focus();
  }, [state5])

  return (
    <div className='flex w-screen flex-row items-center justify-center bg-zinc-800 border-b-2 border-white p-1'>
      
      <div className="hidden lg:block basis-3/12">
        <div className='flex flex-row gap-3 items-center'>
          
          <div className=''>
            <Link to={'/'}>
              <img src='/fb.ico' className='w-14'></img>
            </Link>            
          </div>

          <div className={`${state5 ? 'hidden' : 'block'} p-2 rounded-full hover:bg-slate-400 transition-all`}>
            <img ref={parentRef5} onClick={() => {setState5(true);}} src='/find.png' className='w-10'></img>
          </div>
          <form onSubmit={(e) => {}}>
            <input ref={ref5} className={`${state5 ? 'block' : 'hidden'} bg-stone-400 p-2 outline-none rounded-3xl indent-4`}></input>
          </form>

        </div>
      </div>

      <div className='flex flex-row lg:basis-6/12 justify-between gap-1 basis-4/5'>
        
        <Link className={`${index==1 ? 'bg-blue-600' : ''}  group relative rounded-lg`} to='/'>
          <div className='px-4 lg:px-7 py-2 hover:bg-slate-400 rounded-lg transition-all'>
              <img src='/home.png' className='w-10'></img>
          </div>
          <div className=' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-1 -translate-x-1/2'>
            <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
              <p className='p-3 whitespace-nowrap'>Trang chủ</p>
            </div>
          </div>
        </Link>
        
        <Link className={`${index==2 ? 'bg-blue-600' : ''} group relative rounded-lg`} to='/video'>
          <div className='px-4 lg:px-7 py-2 hover:bg-slate-400 rounded-lg transition-all'>
              <img src='/video.png' className='w-10'></img>
          </div>
          <div className=' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-1 -translate-x-1/2'>
            <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
              <p className='p-3 whitespace-nowrap'>Video</p>
            </div>
          </div>
        </Link>

        <Link className={`${index==3 ? 'bg-blue-600' : ''} group relative rounded-lg`} to='/marketplace'>
          <div className='px-4 lg:px-7 py-2 hover:bg-slate-400 rounded-lg transition-all'>
              <img src='/marketplace.png' className='w-10'></img>
          </div>
          <div className=' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-1 -translate-x-1/2'>
            <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
              <p className='p-3 whitespace-nowrap'>Marketplace</p>
            </div>
          </div>
        </Link>

        <Link className={`${index==4 ? 'bg-blue-600' : ''} group relative rounded-lg`} to='/group'>
          <div className='px-4 lg:px-7 py-2 hover:bg-slate-400 rounded-lg transition-all'>
              <img src='/group.png' className='w-10'></img>
          </div>
          <div className=' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-1 -translate-x-1/2'>
            <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
              <p className='p-3 whitespace-nowrap'>Nhóm</p>
            </div>
          </div>
        </Link>

        <Link className={`${index==5 ? 'bg-blue-600' : ''} group relative rounded-lg`} to='/gaming'>
          <div className='px-4 lg:px-7 py-2 hover:bg-slate-400 rounded-lg transition-all'>
            <img src='/gaming.png' className='w-10'></img>
          </div>
          <div className=' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-1 -translate-x-1/2'>
            <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
              <p className='p-3 whitespace-nowrap'>Trò chơi</p>
            </div>
          </div>
        </Link>

      </div>

      <div className="basis-3/12 hidden lg:block">
        <div className='flex flex-row items-center  justify-end gap-1 mr-4'>
          
          <div ref={parentRef1} onClick={() => {setState1(true)}} className={`p-2 rounded-full ${state1? ' bg-blue-600':' hover:bg-slate-400'} transition-all  group relative`} href="/"> 
            
            <img src='/menu.png' className='w-10'></img>
            <div className={state1? 'hidden' : ' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-3 -translate-x-1/2'}>
              <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
                <p className='p-3 whitespace-nowrap'>Menu</p>
              </div>
            </div>
          
            <div ref={ref1} className={` ${state1 ? 'block' : 'hidden'} rounded-lg z-50 absolute bg-slate-400 right-0 translate-y-3`}>
              <div className="p-10">
                <p>Menu</p>
              </div>
            </div>  
          </div>

          <div ref={parentRef2} onClick={() => setState2(true)} className={`p-2 rounded-full ${state2? ' bg-blue-600':' hover:bg-slate-400'} transition-all  group relative`} href="/"> 
            <img src='/messenger.png' className='w-10'></img>
            <div className={state2? 'hidden' : ' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-3 -translate-x-1/2'}>
              <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
                <p className='p-3 whitespace-nowrap'>Messenger</p>
              </div>
            </div>
            <div ref={ref2} className={` ${state2 ? 'block' : 'hidden'} rounded-lg z-50 absolute bg-slate-400 right-0 translate-y-3`}>
              <div className="p-10">
                <Link to={'/groupchat'} className=" bg-red-600 p-5 rounded-lg">GroupChat</Link>
              </div>
            </div> 
          </div>

          <div ref={parentRef3} onClick={() => setState3(true)} className={`p-2 rounded-full ${state3? ' bg-blue-600':' hover:bg-slate-400'} transition-all  group relative`} href="/"> 
            <img src='/bell.png' className='w-10'></img>
            <div className={state3? 'hidden' : ' bg-slate-400 rounded-lg absolute max-h-0 duration-500 overflow-hidden group-hover:max-h-full transition-all group-hover:block z-10 left-1/2 translate-y-3 -translate-x-1/2'}>
              <div className=" relative after:absolute after:h-1 after:w-0 after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
                <p className='p-3 whitespace-nowrap'>Thông báo</p>
              </div>
            </div>
            <div ref={ref3} className={` ${state3 ? 'block' : 'hidden'} rounded-lg z-50 absolute bg-slate-400 right-0 translate-y-3`}>
              <div className="p-10">
                <p>Thông báo</p>
              </div>
            </div> 
          </div>
          
          <div ref={parentRef4} onClick={() => setState4(true)} className='p-2 transition-all  group relative' href="/"> 
            <div className="w-10 rounded-full h-10">
              <ImageComponent id={user.avt} isRound={true}></ImageComponent>      
            </div>
            <div className={state4 ? 'hidden':' bg-slate-400 rounded-lg overflow-hidden absolute max-h-0 duration-500  group-hover:max-h-full transition-all right-0 translate-y-3'}>
              <div className=" relative after:absolute after:h-1 after:w-0  after:bottom-0 after:delay-500 after:duration-500 group-hover:after:w-full after:transition-all after:bg-green-600">
                <p className='p-3 whitespace-nowrap'>Tài khoản</p>
              </div>
            </div>
            <div ref={ref4} className={` ${state4 ? 'block' : 'hidden'} absolute rounded-lg z-50 bg-slate-400 right-0 translate-y-3`}>
              <div className="p-10">
                <p>Tài khoản</p>
                <button onClick={() => setUser(null)} className=" bg-red-600 hover:rounded-xl hover:bg-blue-600 transition-all">Đăng xuất</button>
              </div>
            </div> 
          </div>
          
        </div>
      </div>

    </div>
  )
}