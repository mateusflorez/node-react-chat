import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../assets/Logo.png'

function Register() {
    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleSubmit(e: any) {
        e.preventDefault()
        handleValidation()
    }

    function handleValidation() {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            toast.error("Password and confirmation password should be the same.", toastOptions)
        }
    }

    function handleChange(e: any) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-[#131324]'>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-8 bg-[#00000076] rounded-[2rem] py-12 px-20'>
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
