import { useContext, useRef } from "react";
import { socket } from "./socket";
import {getMessages, createMessage} from "../src/apis/message"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CommonContexts } from "./contexts/contexts";
import Message from "./components/Message";
import { toast } from "react-toastify";
 
export default function GroupChat() {
  const {user} = useContext(CommonContexts);
  const messageRef = useRef();
  
  const messagesQuery = useQuery({
    queryKey : ['messages'],
    queryFn : () => getMessages({}),
    onSuccess : () => messageRef.current.scrollIntoView()
  })

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn : createMessage,
    onSuccess : () => {
      queryClient.invalidateQueries(['messages']),
      socket.emit('dataUpdate', {
        queryKey : ['messages'],
      })
      messageRef.current.scrollIntoView()
    }
  })

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if(messageRef.current && messageRef.current.value.trim()) {
      mutation.mutate({text : messageRef.current.value, userId : user._id});      
      messageRef.current.value = '';
    }
    else {
      toast.warning('Không để tin nhắn trống')
    }
  }
  
  return (
    <div>
      {
        messagesQuery.isError || messagesQuery.isLoading ? 
        <></>
        :
        <div className=" flex flex-col mx-10">
          <div className=" min-h-[75vh]">
            {
            messagesQuery.data.map(element => 
              <div key={element._id} className=" my-10">
                <Message message={element}/>
              </div>
            )
            }
          </div>

          <form onSubmit={handleCreateMessage} className=" flex flex-row items-center justify-between gap-5">
            <input ref={messageRef} className="rounded-lg indent-4 p-4 text-black w-full"></input>
            <button className=" rounded-lg hover:bg-blue-800 bg-blue-600 p-4">Gửi</button>
          </form>

        </div>
      }
    </div>
  )
}