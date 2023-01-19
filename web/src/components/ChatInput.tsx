import { useState } from "react"
import Picker from "emoji-picker-react"
import { Theme } from 'emoji-picker-react'
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"

export default function ChatInput({ handleSendMessage }: { handleSendMessage: any }) {
    const theme = Theme.DARK

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [message, setMessage] = useState("")

    function handleEmojiPicker() {
        setShowEmojiPicker(!showEmojiPicker)
    }

    function handleEmojiClick(emoji: any, e: any) {
        let messageTemp = message
        messageTemp += emoji.emoji
        setMessage(messageTemp)
    }

    function sendChat(e: any) {
        e.preventDefault()
        if (message.length > 0) {
            handleSendMessage(message)
            setMessage('')
        }
    }

    return (
        <div className="h-full grid grid-cols-[5%_95%] items-center bg-ghost px-8 pb-1">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <BsEmojiSmileFill className="text-leaves cursor-pointer" onClick={handleEmojiPicker} />
                    {
                        showEmojiPicker && <div className="absolute top-[-350px] left-[-30px]"><Picker onEmojiClick={handleEmojiClick} theme={theme} width={280} height={320} previewConfig={{ showPreview: false }} /></div>
                    }
                </div>
            </div>
            <form onSubmit={(e) => sendChat(e)} className="w-full rounded-[2rem] flex content-center gap-8 bg-[#ffffff34]">
                <input className="bg-transparent w-[90%] text-white border-none pl-4 text-base focus:outline-none" type="text" placeholder="Type your message here" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <button className="submit px-8 py-2 rounded-[2rem] flex items-center justify-center bg-leaves border-none">
                    <IoMdSend className="text-white text-base" />
                </button>
            </form>
        </div>
    )
}
