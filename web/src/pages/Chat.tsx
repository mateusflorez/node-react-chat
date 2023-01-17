import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from "../utils/APIRoutes"


function Chat() {
    const navigate = useNavigate()

    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState<any>(undefined)

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
    }, [currentUser])

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-night">
            <div className="h-[85vh] w-[85vw] bg-ghost grid grid-cols-[25% 75%] md:grid-cols-[35% 65%] lg:grid-cols-[35% 65%]">

            </div>
        </div>
    )
}

export default Chat
