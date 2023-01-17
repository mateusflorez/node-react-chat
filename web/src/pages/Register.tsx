import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../assets/Logo.png'
import { registerRoute } from '../utils/APIRoutes'

function Register() {
    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/")
        }
    }, [])

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (handleValidation()) {
            const { password, username, email } = values
            const request = await axios.post(registerRoute, {
                username,
                email,
                password
            })
            if (request.data.status === false) {
                toast.error(request.data.msg, toastOptions)
            } else {
                localStorage.setItem('chat-app-user', JSON.stringify(request.data.user))
                navigate("/")
            }
        }
    }

    function handleValidation() {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            toast.error("Password and confirmation password should be the same.", toastOptions)
            return false
        }
        if (username.length < 6) {
            toast.error("Username should be equal or greater than 6 characters", toastOptions)
            return false
        }
        if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters", toastOptions)
            return false
        }
        if (email === "") {
            toast.error("Email is required", toastOptions)
            return false
        }
        return true
    }

    function handleChange(e: any) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-night'>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-8 bg-ghost rounded-[2rem] py-12 px-20'>
                <div className='flex items-center gap-4 justify-center'>
                    <img src={Logo} className='h-20' />
                    <h1 className='text-white uppercase font-bold text-4xl'>NRChat</h1>
                </div>
                <input type="text" placeholder='Username' name='username' onChange={e => handleChange(e)} className='bg-transparent p-4 border-[0.1rem] border-lake rounded-[0.4rem] text-white w-full text-base focus:border-[0.1rem] focus:border-leaves focus:outline-none' />
                <input type="email" placeholder='Email' name='email' onChange={e => handleChange(e)} className='bg-transparent p-4 border-[0.1rem] border-lake rounded-[0.4rem] text-white w-full text-base focus:border-[0.1rem] focus:border-leaves focus:outline-none' />
                <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)} className='bg-transparent p-4 border-[0.1rem] border-lake rounded-[0.4rem] text-white w-full text-base focus:border-[0.1rem] focus:border-leaves focus:outline-none' />
                <input type="password" placeholder='Confirm your password' name='confirmPassword' onChange={e => handleChange(e)} className='bg-transparent p-4 border-[0.1rem] border-lake rounded-[0.4rem] text-white w-full text-base focus:border-[0.1rem] focus:border-leaves focus:outline-none' />
                <button type='submit' className='bg-lake text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-base uppercase transition hover:bg-ocean'>Create user</button>
                <span className='text-white'>Already have an account? <Link to="/login" className='text-ocean no-underline font-bold '>Login</Link></span>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    )
}



export default Register
