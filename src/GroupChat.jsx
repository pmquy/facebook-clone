import { useContext, useEffect, useRef } from "react";
import { socket } from "./socket";
import {getMessages, createMessage} from "../src/apis/message"
import { useQuery } from "react-query";
import { CommonContexts } from "./contexts/contexts";
import Message from "./components/Message";
 
export default function GroupChat() {
  const {user} = useContext(CommonContexts);
  const {isLoading, error, data:messages, refetch} = useQuery(['messages'], () => getMessages({}))
  const messageRef = useRef();

  useEffect(() => {
    if(messageRef.current)
      messageRef.current.scrollIntoView();
  }, [messages])

  useEffect(() => {
    const listener = () => {
      refetch();
    }
    socket.on('someone chat', listener)
    return () => {socket.off('someone chat', listener)}
  }, [])
  
  const handleCreateMessage = async () => {
    if(messageRef.current && messageRef.current.value) {
      await createMessage({text : messageRef.current.value, userId : user._id});
      socket.emit('someone chat');
      messageRef.current.value = '';
    }
    else {
      alert('Không để tin nhắn trống')
    }
  }
  
  if(isLoading || error) {
    return (
      <div></div>
    )
  }

  return (
    <div className=" flex flex-col mx-10">
      <div className=" min-h-[75vh]">
        {
        messages.map(element => 
          <div key={element._id} className=" my-10">
            <Message message={element}/>
          </div>
        )
        }
      </div>

      <form onSubmit={async e => {e.preventDefault();await handleCreateMessage();}} className=" flex flex-row items-center justify-between gap-5">
        <input ref={messageRef} className="rounded-lg indent-4 p-4 text-black w-full"></input>
        <button className=" rounded-lg hover:bg-blue-800 bg-blue-600 p-4">Gửi</button>
      </form>

    </div>
  )
}