import Chat from '../assets/Chat.gif'

export default function Welcome({ currentUser }: { currentUser: any }) {

    return (
        <div className='flex justify-center items-center flex-col gap-4'>
            <img src={Chat} className='h-80' />
            <h1 className='text-white font-bold text-4xl'>
                Welcome, <span className='text-ocean'>{currentUser?.username}</span>
            </h1>
            <h3 className='text-white font-bold'>
                Please select a chat to start messaging
            </h3>
        </div>
    )
}
