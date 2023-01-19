import { useEffect, useState } from "react"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import axios from "axios"
import { getMessagesRoute, sendMessageRoute } from "../utils/APIRoutes"

export default function ChatContainer({ currentChat, currentUser }: { currentChat: any, currentUser: any }) {
  const [currentChatname, setCurrentChatname] = useState([undefined])
  const [currentChatImage, setCurrentChatImage] = useState([undefined])
  const [messages, setMessages] = useState<any>()

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`${getMessagesRoute}?from=${currentUser.id}&to=${currentChat.id}`)
      console.log(response.data)
      setMessages(response.data)
    }
    getMessages()
  }, [currentChat])

  const handleSendMessage = async (message: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: currentChat.id,
      message: message
    })
  }

  useEffect(() => {
    if (currentChat) {
      setCurrentChatImage(currentChat.avatarImage)
      setCurrentChatname(currentChat.username)
    }
  }, [currentChat])

  return (
    <div className="h-full w-full overflow-hidden grid grid-rows-[10%_78%_12%]">
      <div className="py-4 flex justify-between items-center px-8 bg-ghost">
        <div className="flex items-center gap-4">
          <div>
            <img className='h-12' src={`data:image/svg+xml;base64,${currentChatImage}`} />
          </div>
          <div>
            <h2 className="text-white font-bold text-base">{currentChatname}</h2>
          </div>
        </div>
      </div>
      <div className="py-4 px-8 flex flex-col gap-4 overflow-auto scrollbar w-full">
        {
          messages && messages.map((message: any, index: any) => {
            return (
              <div className={`
                ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}
                flex items-center
                `} key={index}>
                <div className={`
                   ${message.senderId === currentUser.id ? "bg-night" : "bg-ghost"}
                  max-w-[100%] sm:max-w-[50%] break-words p-4 text-[1.1rem] rounded-2xl text-[#d1d1d1]
                  `}>
                  <p>
                    {message.message}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  )
}
