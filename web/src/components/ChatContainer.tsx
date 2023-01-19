import { useEffect, useState } from "react"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import axios from "axios"
import { sendMessageRoute } from "../utils/APIRoutes"

export default function ChatContainer({ currentChat, currentUser }: { currentChat: any, currentUser: any }) {
  const [currentChatname, setCurrentChatname] = useState([undefined])
  const [currentChatImage, setCurrentChatImage] = useState([undefined])

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
    <div className="pt-4">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <div>
            <img className='h-12' src={`data:image/svg+xml;base64,${currentChatImage}`} />
          </div>
          <div>
            <h2 className="text-white font-bold text-base">{currentChatname}</h2>
          </div>
        </div>
      </div>
      <Messages />
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  )
}
