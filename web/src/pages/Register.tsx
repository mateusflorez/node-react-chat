import { Link } from 'react-router-dom'

function Register() {
    function handleSubmit(e: any) {
        e.preventDefault()
        alert("form")
    }
    function handleChange(e: any) {

    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='brand'>
                    <img src="" />
                    <h1 className='text-red-500'>NRChat</h1>
                </div>
                <input type="text" placeholder='Username' name='username' onChange={e => handleChange(e)} />
                <input type="email" placeholder='Email' name='email' onChange={e => handleChange(e)} />
                <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)} />
                <input type="password" placeholder='ConfirmPassword' name='confirmPassword' onChange={e => handleChange(e)} />
                <button type='submit'>Create user</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}



export default Register
