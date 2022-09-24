import React, {useState, useEffect} from 'react';
import '../css/login.css';
import '../css/cleanStyle.css';

function LoginForm() {
    const [login, setLogin] = useState({
        login: '',
        password: ''
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setLogin(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }
    
    return (
        <main className="log-in-center">
            <form className='log-in-form'>
                <i className="icon-user"></i>
                <label htmlFor="text">Login</label>
                <input type="text" name='login' value={login.login} onChange={handleChange} className="log-in-input" placeholder='login' autoComplete='off' />
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={login.password} onChange={handleChange} className="log-in-input" placeholder='password' />
                <button>Log In</button>
            </form>
        </main>
    );
}

export default LoginForm;