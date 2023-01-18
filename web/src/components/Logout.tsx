import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BiPowerOff } from "react-icons/bi"

export default function Logout() {
    const navigate = useNavigate()

    async function handleClick() {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <button className="flex justify-center items-center p-2 rounded-[0.5rem] h-10 w-10 bg-lake border-none cursor-pointer" onClick={handleClick}>
            <BiPowerOff className="text-[1.3rem] text-white" />
        </button>
    )
}
