import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'

function Register() {
    function handleSubmit(e: any) {
        e.preventDefault()
        alert("form")
    }
    function handleChange(e: any) {

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
        </div>
    )
}



export default Register
