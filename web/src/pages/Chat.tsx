import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"


function Chat() {
    const navigate = useNavigate()

    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState<any>()
    const [currentChat, setCurrentChat] = useState<any>(undefined)

    const handleChatChange = (chat: any) => {
        setCurrentChat(chat)
    }

    useEffect(() => {
        const checkCurrentUser = async () => {
            const user = localStorage.getItem('chat-app-user')
            if (!user) {
                navigate('/login')
            } else {
                setCurrentUser(await JSON.parse(user))
            }
        }
        checkCurrentUser()
    }, [])

    useEffect(() => {
        const getAllUsers = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const response = await axios.get(`${allUsersRoute}/${currentUser.id}`)
                    setContacts(response.data)
                } else {
                    navigate('/setAvatar')
                }
            }
        }
        getAllUsers()
    }, [currentUser])

    return (
        <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-night">
            <div className="h-[80%] w-[80%] bg-ghost grid grid-cols-[50%_50%] sm:grid-cols-[35%_65%] rounded-[0.4rem] overflow-hidden">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer currentChat={currentChat} currentUser={currentUser} />
                    )
                }
            </div>
        </div>
    )
}

export default Chat
