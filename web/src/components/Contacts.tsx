import { useState, useEffect } from "react"
import Logo from '../assets/Logo.png'
import Logout from "./Logout"

export default function Contacts({ contacts, currentUser, changeChat }: { contacts: any[], currentUser: any, changeChat: any }) {
    const [currentUsername, setCurrentUsername] = useState([undefined])
    const [currentUserImage, setCurrentUserImage] = useState([undefined])
    const [currentSelected, setCurrentSelected] = useState([undefined])

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUsername(currentUser.username)
        }
    }, [currentUser])

    function changeCurrentChat(index: any, contact: any) {
        setCurrentSelected(index)
        changeChat(contact)
    }

    if (Array.isArray(contacts)) {
        return (
            <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-ocean">
                <div className="flex items-center justify-center gap-4">
                    <img src={Logo} className="h-8" />
                    <h3 className="text-white uppercase font-bold">NRChat</h3>
                </div>
                <div className="flex flex-col items-center overflow-auto gap-3 scrollbar">
                    {
                        contacts.map((contact: any, index: any) => {
                            return (
                                <div className={`
                                ${index === currentSelected ? "bg-lake" : "bg-ghost"}
                                 min-h-[5rem] w-[90%] cursor-pointer rounded-[0.4rem] p-2 gap-1 sm:gap-4 items-center flex transition ease-in-out
                                `} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                    <div>
                                        <img className='h-12' src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-[0.8rem] sm:text-base">{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-between items-center px-4 bg-ghost">
                    <div className="flex justify-center items-center p-2 gap-1 sm:gap-4">
                        <div>
                            <img className='h-16' src={`data:image/svg+xml;base64,${currentUserImage}`} />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-[0.8rem] md:text-base">{currentUsername}</h2>
                        </div>
                    </div>
                    <Logout />
                </div>
            </div>
        )
    } else {
        return (
            <h1 className="text-white">Error loading contacts</h1>
        )
    }
}
