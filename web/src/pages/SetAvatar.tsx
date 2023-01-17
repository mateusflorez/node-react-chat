import axios from 'axios'
import { Buffer } from 'buffer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../assets/Loader.gif'
import { setAvatarRoute } from '../utils/APIRoutes'

export default function SetAvatar() {
    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const api = 'https://api.multiavatar.com'

    const [avatars, setAvatars] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(Number)

    const navigate = useNavigate()

    async function setProfilePicture() {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions)
        } else {
            const userString = localStorage.getItem("chat-app-user");
            const user = userString ? JSON.parse(userString) : null;
            const request = await axios.post(`${setAvatarRoute}/${user.id}`, {
                image: avatars[selectedAvatar]
            })
            if (request.data.status) {
                user.isAvatarImageSet = true
                user.avatarImage = request.data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                navigate("/")
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64"))
            }
            setAvatars(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate("/login")
        }
    }, [])

    if (isLoading) {
        return (
            <div className='h-[100vh] w-[100vw] flex justify-center items-center flex-col gap-12 bg-night'>
                <img src={`${Loader}`} />
            </div>
        )
    }
    else {
        return (
            <div className='h-[100vh] w-[100vw] flex justify-center items-center flex-col gap-12 bg-night'>
                <div>
                    <h1 className='text-white font-bold text-4xl'>Pick an avatar as your profile picture</h1>
                </div>
                <div className='flex gap-8'>
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div className={`
                                            ${selectedAvatar === index ? "border-ocean" : "border-transparent"}
                                            border-[0.4rem] p-2 rounded-[5rem] flex justify-center items-center transition ease-in-out
                                        `}
                                    key={index}>
                                    <img className='h-24' src={`data:image/svg+xml;base64,${avatar}`} onClick={() => setSelectedAvatar(index)} />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={setProfilePicture} className='bg-lake text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-base uppercase transition hover:bg-ocean'>Set as profile picture</button>
                <ToastContainer></ToastContainer>
            </div >
        )
    }


}
