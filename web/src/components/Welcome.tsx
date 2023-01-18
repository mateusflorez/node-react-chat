import { useEffect, useState } from 'react'
import Chat from '../assets/Chat.gif'

export default function Welcome({ currentUser }: { currentUser: any }) {
    const [currentUsername, setCurrentUsername] = useState([undefined])

    useEffect(() => {
        if (currentUser) {
            setCurrentUsername(currentUser.username)
        }
    }, [currentUser])

    return (
        <div className='flex justify-center items-center flex-col gap-4'>
            <img src={Chat} className='h-80' />
            <h1 className='text-white font-bold text-4xl'>
                Welcome, <span className='text-ocean'>{currentUsername}</span>
            </h1>
            <h3 className='text-white font-bold'>
                Please select a chat to start messaging
            </h3>
        </div>
    )
}
